import React from 'react';
import { Box, Typography } from '@mui/material';

export const SectionHeader: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        top: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: { xs: 'white', sm: 'transparent' },
        pointerEvents: 'none',
        width: '100%',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: { xs: 'flex-end', sm: 'flex-start' },
        }}
      >
        <Box
          sx={{ 
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: { xs: 'flex-start', sm: 'center' },
            width: { xs: '85%', sm: '83.4%', md: '70%', lg: '60%', xl: '55%' },
            backgroundColor: 'white',
            pointerEvents: 'auto',
            borderBottomRightRadius: { xs: '0', sm: '40px' },
          }}
        >
          <Box 
            sx={{ 
              pl: { xs: 1, sm: 2, md: 2 },
              pr: { xs: 2, sm: 3, md: 4 },
              py: { xs: 0.3, sm: 0.4, md: 0.5 },
              backgroundColor: 'white',
              display: 'inline-block',
              borderLeft: '10px solid #5B1B5E',
              pointerEvents: 'auto',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 400,
                fontSize: { xs: '1rem', sm: '1.6rem', md: '1.8rem', lg: '2rem' },
                letterSpacing: { xs: 1, sm: 3, md: 3, lg: 4 },
                textTransform: 'uppercase',
                color: '#333',
                mb: 0,
              }}
            >
              CONTENIDO
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'Roboto',
                color: '#333',
                fontSize: { xs: '0.65rem', sm: '0.9rem', md: '0.9rem', lg: '1rem' },
              }}
            >
              Elije un módulo para empezar
            </Typography>
          </Box>
        </Box>

        <Box
          component="img"
          src="/landing/borde_redondeado.svg"
          alt="Borde decorativo"
          sx={{
            width: {  sm: '4%', md: '3.5%', lg: '4%', xl: '2%' },
            height: '10%',
            display: { xs: 'none', sm: 'block' },
            pointerEvents: 'none',
          }}
        />
      </Box>
    </Box>
  );
};
