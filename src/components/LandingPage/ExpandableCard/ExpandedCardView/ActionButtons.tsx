import React from 'react';
import { Box, Button } from '@mui/material';

export const ActionButtons: React.FC = () => {
  return (
    <Box sx={{ p: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#8B5CF6',
          color: 'white',
          textTransform: 'none',
          fontFamily: 'Roboto',
          borderRadius: '20px',
          px: 4,
          py: 1,
          '&:hover': { backgroundColor: '#7C3AED' }
        }}
      >
        ✓ Iniciar
      </Button>
    </Box>
  );
};
