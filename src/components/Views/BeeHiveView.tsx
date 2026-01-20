import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CardActionArea, CircularProgress, Box, Alert, Button, Chip, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { honeycombApi, HoneycombItem } from '../../services/honeycombApi';
import HiveIcon from '@mui/icons-material/Hive';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import GridViewIcon from '@mui/icons-material/GridView';
import HomeIcon from '@mui/icons-material/Home';

export const BeeHiveView: React.FC = () => {
  const [honeycombs, setHoneycombs] = useState<HoneycombItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadHoneycombs();
  }, []);

  const loadHoneycombs = async () => {
    try {
      setError(null);
      console.log('Iniciando carga de honeycombs...');
      const data = await honeycombApi.getHoneycombs();
      console.log('Honeycombs recibidos:', data);
      setHoneycombs(data.honeycombs || []);
    } catch (error) {
      console.error('Error loading honeycombs:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido al cargar honeycombs');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLandingPage = async () => {
    try {
      navigate('/');
    } catch (error) {
      console.error('Error navigating to landing page:', error);
    }
  };

  const handleGoToEditor = async () => {
    try {
      // Crear un diagrama que muestre todos los honeycombs
      const rootNode = {
        id: 'beehive-root',
        data: {
          label: 'BeeHive',
          themeColor: 'root',
          url: 'http://localhost:3000/',
        },
        position: { x: 0, y: 0 },
        type: 'custom',
        width: 200,
        height: 80,
      };


      const childNodes = honeycombs.map((hc, index) => {
        const angle = (2 * Math.PI * index) / honeycombs.length;
        const radius = 300;
        return {
          id: hc.id,
          data: {
            label: hc.title,
            themeColor: 'default',
            url: `http://localhost:3000/honeycomb/${hc.id}`,
            icon: hc.icon,
          },
          position: {
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
          },
          type: 'custom',
          width: 152,
          height: 58,
        };
      });

      const edges = honeycombs.map((hc) => ({
        id: `edge-root-${hc.id}`,
        source: 'beehive-root',
        target: hc.id,
        type: 'custom-label',
        data: { hasArrow: false },
      }));

      const diagram = {
        nodes: [rootNode, ...childNodes],
        edges: edges,
      };

      // Guardar en sessionStorage
      sessionStorage.setItem('REACT_APP_DIAGRAM_DATA', JSON.stringify(diagram));
      sessionStorage.removeItem('REACT_APP_START_URL'); // Limpiar URL de API
      
      navigate('/editor');
    } catch (error) {
      console.error('Error creating diagram:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        gap: 2
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Cargando BeeHive...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Hero Header */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #FDB913 0%, #F7931E 50%, #ED1C24 100%)',
          color: 'white',
          py: 8,
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 0V4h-2V0h-4v2h4v4h2V2h4V0h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <HiveIcon sx={{ fontSize: 60 }} />
            <Box>
              <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
                BeeHive Project
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.95, fontWeight: 300 }}>
                Sistema de gestión de contenido modular y colaborativo
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mt: 4, flexWrap: 'wrap' }}>
            <Chip 
              icon={<GridViewIcon />}
              label={`${honeycombs.length} Honeycombs`}
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.25)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9rem',
                py: 2.5,
                backdropFilter: 'blur(10px)'
              }}
            />
            <Button 
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={handleGoToLandingPage}
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.95)',
                color: '#ED1C24',
                fontWeight: 600,
                py: 1.5,
                px: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(237, 28, 36, 0.3)',
                  color: '#ED1C24'
                },
                transition: 'all 0.3s'
              }}
            >
              Ir a Landing Page
            </Button>
            <Button 
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleGoToEditor}
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.95)',
                color: '#F7931E',
                fontWeight: 600,
                py: 1.5,
                px: 3,
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
                },
                transition: 'all 0.3s'
              }}
            >
              Abrir Editor de Diagramas
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        {error && (
          <Alert 
            severity="error" 
            icon={<HiveIcon />}
            sx={{ 
              mb: 4,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(237, 28, 36, 0.15)'
            }}
            action={
              <Button 
                size="small" 
                startIcon={<RefreshIcon />}
                onClick={loadHoneycombs}
                sx={{ color: 'inherit' }}
              >
                Reintentar
              </Button>
            }
          >
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
              Error al cargar los honeycombs
            </Typography>
            <Typography variant="body2">
              {error}
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1, opacity: 0.8 }}>
              Verifica que el servidor esté corriendo en http://localhost:6543
            </Typography>
          </Alert>
        )}

        {/* Sección de Honeycombs */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                color: '#333'
              }}
            >
              <HiveIcon sx={{ fontSize: 35, color: '#F7931E' }} />
              Honeycombs Disponibles
            </Typography>
            <Chip 
              label={`${honeycombs.length} Total`}
              color="primary"
              sx={{ fontWeight: 600 }}
            />
          </Box>
          <Divider sx={{ mb: 4 }} />
        </Box>

        {honeycombs.length === 0 && !error ? (
          <Paper 
            elevation={0}
            sx={{ 
              p: 6, 
              textAlign: 'center',
              backgroundColor: '#fff',
              borderRadius: 3,
              border: '2px dashed #e0e0e0'
            }}
          >
            <HiveIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ color: '#666' }}>
              No hay honeycombs disponibles
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Verifica que el backend esté corriendo correctamente
            </Typography>
            <Button 
              variant="outlined" 
              startIcon={<RefreshIcon />}
              onClick={loadHoneycombs}
            >
              Recargar
            </Button>
          </Paper>
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
            {honeycombs.map((hc, index) => (
              <Card 
                key={hc.id}
                elevation={2}
                sx={{ 
                  height: '100%',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  borderRadius: 2,
                  border: '2px solid transparent',
                  overflow: 'visible',
                  backgroundColor: '#ffffff', // Fondo blanco explícito
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(247, 147, 30, 0.2)',
                    borderColor: '#F7931E',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '5px',
                    background: `linear-gradient(90deg, #FDB913, #F7931E, #ED1C24)`,
                    borderRadius: '8px 8px 0 0'
                  }
                }}
                onClick={() => {
                  console.log('Navegando a honeycomb:', hc.id);
                  navigate(`/honeycomb/${hc.id}`);
                }}
              >
                <CardActionArea sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3, backgroundColor: '#ffffff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      {hc.icon && (
                        <Box 
                          sx={{ 
                            fontSize: '3rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 70,
                            height: 70,
                            borderRadius: 2,
                            backgroundColor: 'rgba(247, 147, 30, 0.1)',
                            flexShrink: 0
                          }}
                        >
                          {hc.icon}
                        </Box>
                      )}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography 
                          variant="h6" 
                          component="div"
                          sx={{ 
                            fontWeight: 600,
                            color: '#333',
                            mb: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {hc.title}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            display: 'block',
                            color: '#666', // Color más oscuro para mejor contraste
                            fontFamily: 'monospace',
                            backgroundColor: '#f5f5f5',
                            padding: '4px 8px',
                            borderRadius: 1,
                            fontSize: '0.7rem'
                          }}
                        >
                          ID: {hc.id.substring(0, 16)}...
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Chip 
                            label={`Honeycomb #${index + 1}`}
                            size="small"
                            sx={{ 
                              backgroundColor: 'rgba(247, 147, 30, 0.15)',
                              color: '#F7931E',
                              fontWeight: 600,
                              fontSize: '0.7rem'
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};
