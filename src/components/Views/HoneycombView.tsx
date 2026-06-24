import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box, Breadcrumbs, Link, Alert, Button, Card, CardContent, Chip, Paper, Divider, IconButton, Tooltip, Snackbar } from '@mui/material';
import { honeycombApi } from '../../services/honeycombApi';
import HiveIcon from '@mui/icons-material/Hive';
import EditIcon from '@mui/icons-material/Edit';
import CodeIcon from '@mui/icons-material/Code';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GridViewIcon from '@mui/icons-material/GridView';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const HoneycombView: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [honeycomb, setHoneycomb] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (name) loadHoneycomb(name);
  }, [name]);

  const loadHoneycomb = async (honeycombName: string) => {
    try {
      setError(null);
      console.log('Cargando honeycomb:', honeycombName);
      const data = await honeycombApi.getHoneycomb(honeycombName);
      console.log('Datos del honeycomb recibidos:', data);
      setHoneycomb(data);
    } catch (error) {
      console.error('Error loading honeycomb:', error);
      setError(error instanceof Error ? error.message : 'Error al cargar honeycomb');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyId = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(id);
      console.log('✅ ID copiado al portapapeles:', id);
    }).catch((err) => {
      console.error('❌ Error al copiar ID:', err);
    });
  };

  const handleCloseSnackbar = () => {
    setCopiedId(null);
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
          <Button size="small" onClick={() => name && loadHoneycomb(name)} sx={{ mt: 1 }}>
            Reintentar
          </Button>
        </Alert>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Volver al inicio
        </Button>
      </Container>
    );
  }

  if (!honeycomb) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">Honeycomb no encontrado</Typography>
        <Button variant="outlined" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Volver al inicio
        </Button>
      </Container>
    );
  }

  // Filtrar el nodo raíz de los nodos hijos
  const childNodes = honeycomb.nodes?.filter((node: any) => node.data?.themeColor !== 'root') || [];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header con degradado */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 6,
          mb: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs 
            sx={{ 
              mb: 2,
              '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.7)' },
              '& a': { color: 'rgba(255,255,255,0.9)' }
            }}
          >
            <Link 
              underline="hover" 
              onClick={() => navigate('/')} 
              sx={{ 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                '&:hover': { color: 'white' }
              }}
            >
              <HiveIcon fontSize="small" />
              BeeHive
            </Link>
            <Typography color="white" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <GridViewIcon fontSize="small" />
              {honeycomb.title}
            </Typography>
          </Breadcrumbs>

          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            {honeycomb.title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip 
              icon={<GridViewIcon />}
              label={`${childNodes.length} celdas`} 
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 600,
                backdropFilter: 'blur(10px)'
              }} 
            />
            {honeycomb.edges && (
              <Chip 
                label={`${honeycomb.edges.length} conexiones`} 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  backdropFilter: 'blur(10px)'
                }} 
              />
            )}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        {/* Botones de acción principales */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            mb: 4, 
            display: 'flex', 
            gap: 2, 
            flexWrap: 'wrap',
            borderRadius: 2
          }}
        >
          <Button 
            variant="outlined" 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/beehive')}
            sx={{ flex: { xs: '1 1 100%', sm: '0 1 auto' } }}
          >
            Volver al inicio
          </Button>
          <Button 
            variant="contained" 
            startIcon={<EditIcon />}
            onClick={() => {
              const apiUrl = `http://localhost:6543/api/v1/honeycombs/${name}`;
              sessionStorage.setItem('REACT_APP_START_URL', apiUrl);
              navigate('/editor');
            }}
            sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 auto' },
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
              }
            }}
          >
            Abrir en Editor
          </Button>
          <Button 
            variant="outlined"
            startIcon={<CodeIcon />}
            onClick={() => {
              const apiUrl = `http://localhost:6543/api/v1/honeycombs/${name}`;
              window.open(apiUrl, '_blank');
            }}
            sx={{ flex: { xs: '1 1 100%', sm: '0 1 auto' } }}
          >
            Ver API JSON
          </Button>
        </Paper>

        {/* Título de sección */}
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: '#333'
            }}
          >
            <GridViewIcon fontSize="large" />
            Celdas Disponibles
          </Typography>
          <Divider sx={{ mt: 1, mb: 3 }} />
        </Box>

        {/* Grid de celdas mejorado */}
        {childNodes.length === 0 ? (
          <Alert 
            severity="info" 
            icon={<HiveIcon />}
            sx={{ 
              borderRadius: 2,
              '& .MuiAlert-message': { width: '100%' }
            }}
          >
            <Typography variant="h6" gutterBottom>No hay celdas disponibles</Typography>
            <Typography variant="body2">
              Este honeycomb aún no tiene celdas. Usa el editor para agregar contenido.
            </Typography>
          </Alert>
        ) : (
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: { 
                xs: '1fr', 
                sm: 'repeat(2, 1fr)', 
                md: 'repeat(3, 1fr)' 
              },
              gap: 3
            }}
          >
            {childNodes.map((node: any, index: number) => (
              <Card 
                key={node.id}
                elevation={2}
                sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderRadius: 2,
                  border: '2px solid transparent',
                  position: 'relative',
                  overflow: 'visible',
                  backgroundColor: '#ffffff', // Fondo blanco explícito
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                    borderColor: '#667eea',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${node.data?.themeColor || '#667eea'}, ${node.data?.themeColor || '#764ba2'})`,
                    borderRadius: '8px 8px 0 0'
                  }
                }}
                onClick={() => {
                  console.log('Navegando a nodo:', node.id);
                  navigate(`/node/${node.id}`);
                }}
              >
                <CardContent sx={{ p: 3, backgroundColor: '#ffffff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    {node.data?.icon && (
                      <Box 
                        sx={{ 
                          fontSize: '3rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          backgroundColor: 'rgba(102, 126, 234, 0.1)',
                          flexShrink: 0
                        }}
                      >
                        {node.data.icon}
                      </Box>
                    )}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography 
                        variant="h6" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 600,
                          color: '#333',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {node.data?.label || 'Sin título'}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            display: 'block',
                            color: '#666',
                            fontFamily: 'monospace',
                            backgroundColor: '#f5f5f5',
                            padding: '4px 8px',
                            borderRadius: 1,
                            fontSize: '0.7rem',
                            flex: 1
                          }}
                        >
                          ID: {node.id.substring(0, 8)}...
                        </Typography>
                        <Tooltip title="Copiar ID completo" arrow>
                          <IconButton
                            size="small"
                            onClick={(e) => handleCopyId(node.id, e)}
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
                            <ContentCopyIcon sx={{ fontSize: '0.9rem' }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {node.data?.url && (
                          <Chip 
                            label="Con contenido" 
                            size="small" 
                            color="success"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        )}
                        <Chip 
                          label={`Celda #${index + 1}`} 
                          size="small" 
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>

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
