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
    <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 100, display: 'flex', gap: 1, alignItems: 'center' }}>
      {hasMultipleImages && (
        <>
          <IconButton onClick={onPrevImage} sx={{ width: 36, height: 36, backgroundColor: 'rgba(0,0,0,0.05)', color: '#000', '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' } }}>
            <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>‹</Typography>
          </IconButton>
          <IconButton onClick={onNextImage} sx={{ width: 36, height: 36, backgroundColor: 'rgba(0,0,0,0.05)', color: '#000', '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' } }}>
            <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>›</Typography>
          </IconButton>
        </>
      )}
      <IconButton onClick={onClose} sx={{ width: 36, height: 36, backgroundColor: 'rgba(0,0,0,0.05)', color: '#000', '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' } }}>
        <CloseIcon sx={{ fontSize: '1.2rem' }} />
      </IconButton>
    </Box>
  );
};
