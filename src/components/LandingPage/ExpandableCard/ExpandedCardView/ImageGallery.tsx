import React from 'react';
import { Box } from '@mui/material';

interface ImageGalleryProps {
  images: string[];
  selectedImageIndex: number;
  cardTitle: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, selectedImageIndex, cardTitle }) => {
  return (
    <Box sx={{ 
      flex: '0 0 35%',
      position: 'relative',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      animation: 'slideInLeft 0.5s ease-out',
      '@keyframes slideInLeft': {
        '0%': {
          opacity: 0,
          transform: 'translateX(-30px)',
        },
        '100%': {
          opacity: 1,
          transform: 'translateX(0)',
        },
      },
    }}>
      <img 
        src={images[selectedImageIndex]} 
        alt={`${cardTitle} - ${selectedImageIndex + 1}`}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </Box>
  );
};
