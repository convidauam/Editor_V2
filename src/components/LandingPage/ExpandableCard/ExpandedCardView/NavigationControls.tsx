import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface NavigationControlsProps {
  hasMultipleImages: boolean;
  onPrevImage: () => void;
  onNextImage: () => void;
  onClose: () => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({ hasMultipleImages, onPrevImage, onNextImage, onClose }) => {
  return (
    <Box sx={{ 
      position: 'absolute', 
      top: { xs: 8, sm: 10, md: 12 }, 
      right: { xs: 8, sm: 10, md: 12 }, 
      zIndex: 100, 
      display: 'flex', 
      gap: { xs: 0.5, sm: 1 }, 
      alignItems: 'center' 
    }}>
      {hasMultipleImages && (
        <>
          <IconButton 
            onClick={onPrevImage} 
            sx={{ 
              width: { xs: 32, sm: 36 }, 
              height: { xs: 32, sm: 36 }, 
              backgroundColor: 'rgba(0,0,0,0.05)', 
              color: '#000', 
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' } 
            }}
          >
            <Typography sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem' }, fontWeight: 'bold' }}>‹</Typography>
          </IconButton>
          <IconButton 
            onClick={onNextImage} 
            sx={{ 
              width: { xs: 32, sm: 36 }, 
              height: { xs: 32, sm: 36 }, 
              backgroundColor: 'rgba(0,0,0,0.05)', 
              color: '#000', 
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' } 
            }}
          >
            <Typography sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem' }, fontWeight: 'bold' }}>›</Typography>
          </IconButton>
        </>
      )}
      <IconButton 
        onClick={onClose} 
        sx={{ 
          width: { xs: 32, sm: 36 }, 
          height: { xs: 32, sm: 36 }, 
          backgroundColor: 'rgba(0,0,0,0.05)', 
          color: '#000', 
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' } 
        }}
      >
        <CloseIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />
      </IconButton>
    </Box>
  );
};
