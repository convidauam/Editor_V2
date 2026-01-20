import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Header } from './Header';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: '/SVG_general/Artboard23.svg',
    subtitle: '',
    description: 'Las abejas encierran un sistema complejo de procesos, relaciones y funciones, que han inspirado de la mejor forma que también aprendemos a construir modelos que nos ayuden a comprender y explicar otras realidades.',
    imageUrl: '/landing/Artboard_24_2.png',
  },
  {
    id: 2,
    title: '/SVG_general/Artboard23.svg',
    subtitle: '',
    description: 'Las abejas encierran un sistema complejo de procesos. Al estudiar cómo funcionan, no solo las entendemos mejor, sino que también aprendemos a construir modelos que nos ayudan a comprender y explicar otras realidades.',
    imageUrl: '/landing/Artboard_24.png', 
  }
];

export const HeroCarousel: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = slides.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  // Auto-avanzar cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // 5000 ms = 5 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [activeStep]); // Se reinicia cada vez que cambia activeStep

  const currentSlide = slides[activeStep];

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh', // Cambiar a 100vh para ocupar toda la altura de la ventana
        width: '100vw', // Asegurar que ocupe todo el ancho
        backgroundImage: currentSlide.imageUrl 
          ? `url(${currentSlide.imageUrl})`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: 'white',
        transition: 'background-image 0.5s ease-in-out',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          zIndex: 0,
        },
      }}
    >
      <Header />

      {/* Contenido principal */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          px: { xs: 2, sm: 4, md: 8 }, // Padding responsive
          ml: { xs: 0, md: 8 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Box contenedor con tamaño delimitado */}
        <Box
          sx={{
            maxWidth: { xs: '100%', sm: '500px', md: '800px' },
            minHeight: { xs: '300px', sm: '400px', md: '500px' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
            padding: { xs: 0, md: 0 },
          }}
        >
          {/* Contenido superior */}
          <Box>
            <Box
              component="img"
              src={currentSlide.title}
              alt="Título del slide"
              sx={{
                width: { xs: '200px', sm: '300px', md: '500px' }, // Tamaño responsive
                height: 'auto',
                mb: { xs: 2, md: 3 },
                display: 'block',
              }}
            />
            {currentSlide.subtitle && (
              <Typography variant="h5" sx={{ mb: { xs: 2, md: 3 }, fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' } }}>
                {currentSlide.subtitle}
              </Typography>
            )}
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 2, md: 4 },
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
              }}
            >
              {currentSlide.description}
            </Typography>
          </Box>

          {/* Botón centrado en la parte inferior */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 'auto',
            }}
          >
            <Box
              component="img"
              src="/SVG_general/Artboard20.svg"
              alt="Iniciar"
              sx={{
                width: { xs: '100px', sm: '130px', md: '180px' },
                height: 'auto',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Indicadores de página */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 20, md: 30 },
          right: { xs: 20, sm: 40, md: 80 },
          display: 'flex',
          flexDirection: 'row',
          gap: 0,
          zIndex: 2,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            component="img"
            src={activeStep === index ? '/SVG_general/Artboard18.svg' : '/SVG_general/Artboard19.svg'}
            alt={`Indicador ${index + 1}`}
            sx={{
              width: { xs: 35, sm: 40, md: 50 },
              height: { xs: 35, sm: 40, md: 50 },
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'scale(1.2)',
              },
            }}
            onClick={() => setActiveStep(index)}
          />
        ))}
      </Box>
    </Box>
  );
};
