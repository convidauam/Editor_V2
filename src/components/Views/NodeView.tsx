import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box, Breadcrumbs, Link, Card, CardContent, Alert, Button, Divider, IconButton, Chip, Paper, CardActionArea, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, Snackbar } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';
import ArticleIcon from '@mui/icons-material/Article';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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
  const [extractedMediaUrl, setExtractedMediaUrl] = useState<string | null>(null);
  const [isChildModalOpen, setIsChildModalOpen] = useState(false);
  const [selectedChildNode, setSelectedChildNode] = useState<NodeData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (nodeId) loadNode(nodeId);
  }, [nodeId]);

  const loadNode = async (id: string) => {
    try {
      setError(null);
      console.log('🔍 Cargando nodo:', id);
      const data = await honeycombApi.getNode(id);
      console.log('📦 Datos del nodo recibidos:', data);

      const decodedNode = {
        ...data,
        label: decodeText(data.label),
        title: data.title ? decodeText(data.title) : data.title,
        contents: data.contents ? decodeText(data.contents) : data.contents,
        url: data.url,
        href: data.href,
        iconUrl: data.iconUrl || data.icon,
        nodes: data.nodes?.map((childNode: any) => ({
          ...childNode,
          id: childNode.id,
          label: decodeText(childNode.label || childNode.title || ''),
          title: childNode.title ? decodeText(childNode.title) : childNode.title,
          iconUrl: childNode.iconUrl || childNode.icon,
          href: childNode.href
        })) || [],
        edges: data.edges?.map((edge: any) => ({
          ...edge,
          label: edge.label ? decodeText(edge.label) : edge.label,
          source: edge.source ? decodeText(edge.source) : edge.source,
          target: edge.target ? decodeText(edge.target) : edge.target
        })) || []
      };
      
      console.log('✅ Nodo decodificado:', decodedNode);
      setNode(decodedNode);
      setOriginalNode(decodedNode);
    } catch (error) {
      console.error('❌ Error loading node:', error);
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
    
    if (lang === 'es') {
      setNode(originalNode);
      setCurrentLanguage('es');
      await i18n.changeLanguage('es');
      return;
    }
    
    if (!originalNode) return;
    
    setTranslating(true);
    try {
      const translatedNode = await translateNode(originalNode, lang);
      setNode(translatedNode);
      setCurrentLanguage(lang);
      await i18n.changeLanguage(lang);
    } catch (error) {
      setError('Error al traducir el contenido');
    } finally {
      setTranslating(false);
    }
  };

  useEffect(() => {
    if (node?.href) {
      setExtractedMediaUrl(node.href);
      return;
    }
    
    if (node?.url) {
      setExtractedMediaUrl(node.url);
    }
  }, [node?.url, node?.href]);

  const handleOpenChildModal = (childNode: NodeData) => {
    setSelectedChildNode(childNode);
    setIsChildModalOpen(true);
  };

  const handleCloseChildModal = () => {
    setIsChildModalOpen(false);
    setSelectedChildNode(null);
  };

  const handleCopyId = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
  };

  const handleCloseSnackbar = () => {
    setCopiedId(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', gap: 2 }}>
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          {t('nodeView.loading')}...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa', py: 4 }}>
        <Container maxWidth="lg">
          <Alert severity="error" icon={<ArticleIcon />} sx={{ mb: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(237, 28, 36, 0.15)' }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>{error}</Typography>
          </Alert>
          <Button variant="outlined" startIcon={<HomeIcon />} onClick={() => navigate('/')}>
            {t('nodeView.backToHome')}
          </Button>
        </Container>
      </Box>
    );
  }

  if (!node) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa', py: 4 }}>
        <Container maxWidth="lg">
          <Paper elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: 3, border: '2px dashed #e0e0e0' }}>
            <ArticleIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ color: '#666' }}>
              {t('nodeView.nodeNotFound')}
            </Typography>
            <Button variant="outlined" startIcon={<HomeIcon />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
              {t('nodeView.backToHome')}
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Hero Header */}
      <Box
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 6,
          mb: 4,
          position: 'relative',
          overflow: 'hidden', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Breadcrumbs
              sx={{ 
                '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.7)' },
                '& a': { color: 'rgba(255,255,255,0.9)' }
              }}
            >
              <Link
                underline="hover" 
                component="button"
                onClick={() => navigate('/')}
                sx={{ 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  color: 'inherit',
                  '&:hover': { color: 'white' }
                }}
              >
                <HomeIcon fontSize="small" />
                BeeHive
              </Link>
              <Typography color="white" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ArticleIcon fontSize="small" />
                {node?.label}
              </Typography> 
            </Breadcrumbs>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                icon={<ArticleIcon />}
                label={currentLanguage.toUpperCase()}
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: 1
                }}
              />
              <IconButton
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                }}
                onClick={handleLanguageMenuOpen}
                disabled={translating}
              >
                <TranslateIcon />
              </IconButton>
            </Box>
          </Box>

          <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '2rem', sm: '3rem' }, color: 'white' }}>
            {node?.label}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        {/* Contenido principal */} 
        {node.contents && (
          <Paper elevation={2} sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ 
              p: 0.5, 
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              height: '4px'
            }} />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
                Contenido
              </Typography>
              <Typography variant="body1" component="div" sx={{ 
                whiteSpace: 'pre-wrap',
                lineHeight: 1.8,
                color: '#333'
              }}>
                {node.contents}
              </Typography>
            </CardContent>
          </Paper>
        )}

        {/* URL/Imagen/GIF del nodo - VERSIÓN SIMPLIFICADA */}
        {(node.url || node.href || extractedMediaUrl) && (
          <Paper elevation={2} sx={{ mb: 4, borderRadius: 2, overflow: 'hidden', backgroundColor: '#ffffff' }}>
            <Box sx={{ 
              p: 0.5, 
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              height: '4px'
            }} />
            <CardContent sx={{ p: 4, backgroundColor: '#ffffff' }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
                Recurso Multimedia
              </Typography>
              
              {/* Mostrar URLs disponibles */}
              {node.url && (
                <Box sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Link 
                    href={node.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ color: '#667eea', fontWeight: 600, textDecoration: 'none', wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '0.85rem' }}
                  >
                    URL página: {node.url}
                  </Link>
                </Box>
              )}
              
              {/* Renderizar el contenido según el tipo */}
              <Box sx={{ width: '100%', backgroundColor: '#f5f5f5', borderRadius: 2, overflow: 'hidden' }}>
                {(() => {
                  const resourceUrl = node.href || extractedMediaUrl || node.url;
                  
                  if (!resourceUrl) {
                    return (
                      <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography color="text.secondary">
                          No hay recurso multimedia disponible
                        </Typography>
                      </Box>
                    );
                  }
                  
                  if (node.type === 'CellAnimation' && node.href) {
                    return (
                      <Box sx={{ p: 2, textAlign: 'center', backgroundColor: '#fff' }}>
                        <img 
                          src={node.href} 
                          alt={node.title || node.label}
                          style={{ 
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                          }}
                          onError={(e) => {
                            console.error('❌ Error cargando imagen:', node.href);
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = `<p style="color: #999; padding: 20px;">Error al cargar: ${node.href}</p>`;
                            }
                          }}
                        />
                      </Box>
                    );
                  }
                  
                  if (node.type === 'CellWebContent' && node.href) {
                    return (
                      <Box>
                        <Typography variant="body2" sx={{ p: 2, color: '#666', textAlign: 'center', backgroundColor: '#fff' }}>
                          Contenido web incrustado:
                        </Typography>
                        <iframe
                          src={node.href}
                          style={{ width: '100%', height: '600px', border: 'none', display: 'block' }}
                          title={node.title || node.label}
                          sandbox="allow-scripts allow-same-origin allow-forms"
                        />
                      </Box>
                    );
                  }
                  
                  if (resourceUrl.includes('youtube.com') || resourceUrl.includes('youtu.be')) {
                    const videoId = resourceUrl.includes('watch?v=') 
                      ? resourceUrl.split('watch?v=')[1].split('&')[0]
                      : resourceUrl.split('/').pop();
                    return (
                      <Box sx={{ position: 'relative', paddingBottom: '56.25%', width: '100%', height: 0 }}>
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </Box>
                    );
                  }
                  
                  if (resourceUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
                    return (
                      <Box sx={{ p: 2, textAlign: 'center', backgroundColor: '#fff' }}>
                        <img 
                          src={resourceUrl} 
                          alt={node.title || node.label}
                          style={{ 
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                          }}
                          onError={(e) => {
                            console.error('❌ Error cargando imagen:', resourceUrl);
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = `<p style="color: #999; padding: 20px;">Error al cargar: ${resourceUrl}</p>`;
                            }
                          }}
                        />
                      </Box>
                    );
                  }
                  
                  return (
                    <Box>
                      <Typography variant="body2" sx={{ p: 2, color: '#666', textAlign: 'center', backgroundColor: '#fff' }}>
                        Contenido:
                      </Typography>
                      <iframe
                        src={resourceUrl}
                        style={{ width: '100%', height: '600px', border: 'none', display: 'block' }}
                        title={node.label}
                        sandbox="allow-scripts allow-same-origin allow-forms"
                      />
                    </Box>
                  );
                })()}
              </Box>
            </CardContent>
          </Paper>
        )}

        {/* Icono del nodo si existe - MEJORADO */}
        {node.iconUrl && (node.iconUrl.startsWith('http') || node.iconUrl.startsWith('/')) && (
          <Paper elevation={2} sx={{ mb: 4, borderRadius: 2, overflow: 'hidden', backgroundColor: '#ffffff' }}>
            <Box sx={{ 
              p: 0.5, 
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              height: '4px'
            }} />
            <CardContent sx={{ p: 4, backgroundColor: '#ffffff' }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
                Ícono
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img 
                  src={node.iconUrl} 
                  alt={`Ícono de ${node.label}`}
                  style={{ 
                    maxWidth: '200px',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  onError={(e) => {
                    console.error('Error cargando ícono:', node.iconUrl);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </Box>
            </CardContent>
          </Paper>
        )}

        {/* Nodos relacionados - MEJORADO */}
        {node.nodes && node.nodes.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  color: '#333'
                }}
              >
                <LinkIcon sx={{ color: '#764ba2' }} />
                Nodos Relacionados ({node.nodes.length})
              </Typography>
              <Chip
                label={`${node.nodes.length} nodos`}
                sx={{ 
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  color: '#667eea',
                  fontWeight: 600,
                  borderRadius: 1
                }}
              />
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
              {node.nodes.map((childNode: any) => (
                <Card 
                  key={childNode.id}
                  elevation={2}
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    border: '2px solid transparent',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(102, 126, 234, 0.2)',
                      borderColor: '#667eea'
                    }
                  }}
                  onClick={() => handleOpenChildModal(childNode)}
                >
                  <CardActionArea>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        {/* Mostrar icono/emoji */}
                        {(childNode.iconUrl || childNode.icon) && (
                          <Box 
                            sx={{ 
                              width: 60,
                              height: 60,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 2,
                              backgroundColor: 'rgba(102, 126, 234, 0.1)',
                              flexShrink: 0
                            }}
                          >
                            {(() => {
                              const iconValue = childNode.iconUrl || childNode.icon;
                              // Si es URL de imagen
                              if (iconValue.startsWith('http') || iconValue.startsWith('/')) {
                                return (
                                  <img 
                                    src={iconValue} 
                                    alt={childNode.label || childNode.title} 
                                    style={{ maxHeight: '40px', maxWidth: '40px', objectFit: 'contain' }}
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                  />
                                );
                              }
                              
                              // Si es emoji o texto
                              return <Typography sx={{ fontSize: '2rem' }}>{iconValue}</Typography>;
                            })()}
                          </Box>
                        )}
                        
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="h6"
                            sx={{ 
                              fontWeight: 600,
                              mb: 0.5,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              color: '#333'
                            }}
                          >
                            {childNode.label || childNode.title || 'Sin título'}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                display: 'block',
                                color: '#666',
                                fontWeight: 600,
                                backgroundColor: '#f5f5f5',
                                padding: '4px 8px',
                                borderRadius: 1,
                                fontSize: '0.65rem',
                                flex: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              ID: {childNode.id.substring(0, 12)}...
                            </Typography>
                            <Tooltip title="Copiar ID completo" arrow>
                              <IconButton
                                size="small"
                                onClick={(e) => handleCopyId(childNode.id, e)}
                                sx={{
                                  padding: '4px',
                                  backgroundColor: '#f5f5f5',
                                  '&:hover': {
                                    backgroundColor: '#667eea',
                                    color: 'white'
                                  },
                                  transition: 'all 0.2s'
                                }}
                              >
                                <ContentCopyIcon sx={{ fontSize: '0.8rem' }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          
                          {/* Mostrar tipo de nodo si existe */}
                          {childNode.type && (
                            <Chip 
                              label={childNode.type}
                              size="small" 
                              sx={{ 
                                height: '20px',
                                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                color: '#667eea',
                                borderRadius: 1,
                                mb: 1
                              }}
                            />
                          )}
                          
                          {/* Indicador si tiene contenido multimedia */}
                          {childNode.href && (
                            <Chip 
                              label="📎 Multimedia"
                              size="small"
                              sx={{ 
                                height: '20px',
                                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                color: '#4caf50',
                                borderRadius: 1,
                                ml: 0.5
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </Box>
        )}

        {/* Conexiones */}
        {node.edges && node.edges.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                color: '#333'
              }}
            >
              <LinkIcon sx={{ color: '#764ba2' }} />
              Conexiones ({node.edges.length})
            </Typography>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {node.edges.map((edge: any, index: number) => (
                <Paper 
                  key={index} 
                  elevation={1}
                  sx={{ 
                    p: 2.5,
                    borderRadius: 2,
                    borderLeft: '4px solid #764ba2',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(118, 75, 162, 0.05)',
                      boxShadow: '0 4px 12px rgba(118, 75, 162, 0.15)',
                    }
                  }}
                >
                  <Typography variant="body1">
                    {edge.label && <Chip label={edge.label} size="small" sx={{ mr: 1, mb: 1 }} />}
                    <Box component="span" sx={{ display: 'block', mt: edge.label ? 1 : 0 }}>
                      Desde <strong>{edge.source}</strong> → Hasta <strong>{edge.target}</strong>
                    </Box>
                  </Typography>
                </Paper>
              ))}
            </Box> 
          </Box>
        )}

        {/* Botones de navegación */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ flex: { xs: '1 1 100%', sm: '0 1 auto' } }}>
            Atrás
          </Button>
          <Button 
            variant="contained" 
            startIcon={<HomeIcon />} 
            onClick={() => navigate('/')} 
            sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 auto' }, 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              '&:hover': { background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)' } 
            }}
          >
            Inicio
          </Button>
        </Paper>
      </Container>

      {/* Dialog para mostrar nodo hijo */}
      <Dialog open={isChildModalOpen} onClose={handleCloseChildModal} maxWidth="md" fullWidth>
        {selectedChildNode && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {selectedChildNode.label || selectedChildNode.title}
                </Typography>
                <IconButton onClick={handleCloseChildModal}>
                  <ArrowBackIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              {selectedChildNode.href && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: '#666' }}>Recurso multimedia:</Typography>
                  {selectedChildNode.href.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ? (
                    <img src={selectedChildNode.href} alt={selectedChildNode.label} style={{ maxWidth: '100%', borderRadius: '8px' }} />
                  ) : (
                    <iframe src={selectedChildNode.href} title={selectedChildNode.label} style={{ width: '100%', height: '400px', border: 'none', borderRadius: '8px' }} />
                  )}
                </Box>
              )}
              {selectedChildNode.contents && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: '#666' }}>Contenido:</Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{selectedChildNode.contents}</Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleCloseChildModal}>Cerrar</Button>
              {selectedChildNode.url && (
                <Button variant="outlined" href={selectedChildNode.url} target="_blank" startIcon={<LinkIcon />}>
                  Abrir en nueva pestaña
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Snackbar para confirmar que se copió el ID */}
      <Snackbar
        open={copiedId !== null}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={`✅ ID copiado: ${copiedId?.substring(0, 8)}...`}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#4caf50',
            color: 'white',
            fontWeight: 600
          }
        }}
      />
    </Box>
  );
};
