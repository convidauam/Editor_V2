import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CardActionArea, CircularProgress, Box, Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { honeycombApi, HoneycombItem } from '../../services/honeycombApi';

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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        BeeHive Project
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Welcome to the BeeHive. Please look at the available honeycombs.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
          <br />
          <Typography variant="caption">
            Asegúrate de que el servidor de Honeycomb esté corriendo en http://localhost:6543
          </Typography>
          <br />
          <Button size="small" onClick={loadHoneycombs} sx={{ mt: 1 }}>
            Reintentar
          </Button>
        </Alert>
      )}

      <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 3 }}>
        Honeycombs ({honeycombs.length})
      </Typography>

      {honeycombs.length === 0 && !error ? (
        <Alert severity="info">
          No hay honeycombs disponibles. Verifica que el backend esté corriendo correctamente.
        </Alert>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {honeycombs.map((hc) => (
            <Box key={hc.id} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' } }}>
              <Card 
                elevation={3} 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => {
                    console.log('Navegando a honeycomb:', hc.id);
                    navigate(`/honeycomb/${hc.id}`);
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {hc.icon && (
                        <Typography variant="h2">{hc.icon}</Typography>
                      )}
                      <Box>
                        <Typography variant="h6" component="div">
                          {hc.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {hc.id}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        <Button variant="outlined" onClick={handleGoToEditor}>
          Ir al Editor de Diagramas
        </Button>
      </Box>
    </Container>
  );
};
