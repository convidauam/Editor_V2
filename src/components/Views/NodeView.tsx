import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box, Breadcrumbs, Link, Card, CardContent, Alert, Button, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import { honeycombApi, NodeData } from '../../services/honeycombApi';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/config';
import { decodeText } from '../../utils/textDecoder';
import { translateNode } from '../../services/translationService';

export const NodeView: React.FC = () => {
  const { nodeId } = useParams<{ nodeId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [node, setNode] = useState<NodeData | null>(null);
  const [originalNode, setOriginalNode] = useState<NodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentLanguage, setCurrentLanguage] = useState<string>('es');

  useEffect(() => {
    if (nodeId) loadNode(nodeId);
  }, [nodeId]);

  const loadNode = async (id: string) => {
    try {
      setError(null);
      console.log('Cargando nodo:', id);
      const data = await honeycombApi.getNode(id);
      console.log('Datos del nodo recibidos:', data);
      
      // Decodificar textos SIEMPRE (para español e inglés)
      const decodedNode = {
        ...data,
        label: decodeText(data.label),
        contents: data.contents ? decodeText(data.contents) : data.contents,
        nodes: data.nodes?.map((node: any) => ({
          ...node,
          label: decodeText(node.label || '')
        })),
        edges: data.edges?.map((edge: any) => ({
          ...edge,
          label: edge.label ? decodeText(edge.label) : edge.label,
          source: edge.source ? decodeText(edge.source) : edge.source,
          target: edge.target ? decodeText(edge.target) : edge.target
        }))
      };
      
      setNode(decodedNode);
      setOriginalNode(decodedNode);
    } catch (error) {
      console.error('Error loading node:', error);
      setError(error instanceof Error ? error.message : 'Error al cargar nodo');
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = async (lang: string) => {
    handleLanguageMenuClose();
    
    console.log('Cambiando idioma a:', lang);
    
    if (lang === 'es') {
      setNode(originalNode);
      setCurrentLanguage('es');
      await i18n.changeLanguage('es');
      return;
    }
    
    if (!originalNode) {
      console.error('No hay nodo original para traducir');
      return;
    }
    
    setTranslating(true);
    try {
      console.log('Iniciando traducción del nodo...');
      const translatedNode = await translateNode(originalNode, lang);
      console.log('Nodo traducido:', translatedNode);
      setNode(translatedNode);
      setCurrentLanguage(lang);
      await i18n.changeLanguage(lang);
    } catch (error) {
      console.error('Error translating:', error);
      setError('Error al traducir el contenido');
    } finally {
      setTranslating(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
          <br />
          <Button size="small" onClick={() => nodeId && loadNode(nodeId)} sx={{ mt: 1 }}>
            {t('nodeView.retry')}
          </Button>
        </Alert>
        <Button variant="outlined" onClick={() => navigate('/')}>
          {t('nodeView.backToHome')}
        </Button>
      </Container>
    );
  }

  if (!node) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">{t('nodeView.nodeNotFound')}</Typography>
        <Button variant="outlined" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          {t('nodeView.backToHome')}
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Breadcrumbs>
          <Link underline="hover" color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            BeeHive
          </Link>
          <Typography color="text.primary">{node?.label}</Typography>
        </Breadcrumbs>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {currentLanguage.toUpperCase()}
          </Typography>
          <IconButton onClick={handleLanguageMenuOpen} disabled={translating}>
            <TranslateIcon />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleLanguageMenuClose}
        >
          <MenuItem onClick={() => handleLanguageChange('es')} selected={currentLanguage === 'es'}>
            🇪🇸 Español
          </MenuItem>
          <MenuItem onClick={() => handleLanguageChange('en')} selected={currentLanguage === 'en'}>
            🇬🇧 English
          </MenuItem>
        </Menu>
      </Box>

      {translating && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {t('nodeView.translating')}...
        </Alert>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        {node.iconUrl && (
          <img src={node.iconUrl} alt={node.label} style={{ maxHeight: '80px', maxWidth: '80px' }} />
        )}
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
          {node.label}
        </Typography>
      </Box>

      {node.contents && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap' }}>
              {node.contents}
            </Typography>
          </CardContent>
        </Card>
      )}

      {node.nodes && node.nodes.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            {t('nodeView.relatedNodes')} ({node.nodes.length})
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {node.nodes.map((childNode: any) => (
              <Card 
                key={childNode.id}
                sx={{ 
                  width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 11px)' },
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  }
                }}
                onClick={() => navigate(`/node/${childNode.id}`)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {childNode.iconUrl && (
                      <img src={childNode.iconUrl} alt={childNode.label} style={{ maxHeight: '40px', maxWidth: '40px' }} />
                    )}
                    <Box>
                      <Typography variant="h6">
                        {childNode.label || t('nodeView.noTitle')}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {t('nodeView.id')}: {childNode.id}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}

      {node.edges && node.edges.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            {t('nodeView.connections')} ({node.edges.length})
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {node.edges.map((edge: any, index: number) => (
              <Card key={index} variant="outlined">
                <CardContent>
                  <Typography variant="body2">
                    {edge.label && <strong>{edge.label}: </strong>}
                    {t('nodeView.from')} <em>{edge.source}</em> → {t('nodeView.to')} <em>{edge.target}</em>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}

      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          {t('nodeView.back')}
        </Button>
        <Button variant="outlined" onClick={() => navigate('/')}>
          {t('nodeView.home')}
        </Button>
      </Box>
    </Container>
  );
};
