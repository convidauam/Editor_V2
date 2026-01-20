import React from 'react';
import { Box } from '@mui/material';

export const BackgroundOverlay: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/landing/Artboard_24.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        opacity: 0.7,// Opacidad más baja para que se vea más la imagen
        zIndex: 0,
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(10px)', // Difumina el contenido detrás
          WebkitBackdropFilter: 'blur(10px)', // Para Safari
        },
      }}
    />
  );
};
