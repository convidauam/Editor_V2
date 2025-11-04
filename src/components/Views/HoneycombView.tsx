import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box, Breadcrumbs, Link, Alert, Button, Card, CardContent, Chip } from '@mui/material';
import { honeycombApi } from '../../services/honeycombApi';

export const HoneycombView: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [honeycomb, setHoneycomb] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          BeeHive
        </Link>
        <Typography color="text.primary">{honeycomb.title}</Typography>
      </Breadcrumbs>

      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        {honeycomb.title}
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Chip label={`${childNodes.length} celdas`} color="primary" />
        {honeycomb.edges && <Chip label={`${honeycomb.edges.length} conexiones`} />}
      </Box>

      <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
        Celdas Disponibles
      </Typography>

      {childNodes.length === 0 ? (
        <Alert severity="info">
          No hay celdas disponibles en este honeycomb.
        </Alert>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {childNodes.map((node: any) => (
            <Card 
              key={node.id} 
              sx={{ 
                width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 11px)' },
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 3,
                }
              }}
              onClick={() => {
                console.log('Navegando a nodo:', node.id);
                navigate(`/node/${node.id}`);
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  {node.data?.icon && (
                    <Typography variant="h3">{node.data.icon}</Typography>
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {node.data?.label || 'Sin título'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                      ID: {node.id.substring(0, 8)}...
                    </Typography>
                    {node.data?.url && (
                      <Chip label="Tiene contenido" size="small" color="success" />
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Volver al inicio
        </Button>
        <Button 
          variant="contained" 
          onClick={() => {
            const apiUrl = `http://localhost:6543/api/v1/honeycombs/${name}`;
            console.log('Guardando URL en sessionStorage:', apiUrl);
            sessionStorage.setItem('REACT_APP_START_URL', apiUrl);
            console.log('Verificando guardado:', sessionStorage.getItem('REACT_APP_START_URL'));
            navigate('/editor');
          }}
        >
          Abrir en Editor
        </Button>
        <Button 
          variant="outlined"
          onClick={() => {
            const apiUrl = `http://localhost:6543/api/v1/honeycombs/${name}`;
            window.open(apiUrl, '_blank');
          }}
        >
          Ver API JSON
        </Button>
      </Box>
    </Container>
  );
};
