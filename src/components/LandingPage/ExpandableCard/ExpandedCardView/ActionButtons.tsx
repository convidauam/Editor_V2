import React from 'react';
import { Box, Button } from '@mui/material';

export const ActionButtons: React.FC = () => {
  return (
    <Box sx={{ 
      p: { xs: 2, sm: 2.5, md: 3 }, 
      display: 'flex', 
      gap: 2, 
      justifyContent: { xs: 'center', sm: 'flex-end' } 
    }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#8B5CF6',
          color: 'white',
          textTransform: 'none',
          fontFamily: 'Roboto',
          borderRadius: '20px',
          px: { xs: 3, sm: 4 },
          py: { xs: 0.8, sm: 1 },
          fontSize: { xs: '0.9rem', sm: '1rem' },
          '&:hover': { backgroundColor: '#7C3AED' }
        }}
      >
        ✓ Iniciar
      </Button>
    </Box>
  );
};
