import React from 'react';
import { Box } from '@mui/material';

interface ThumbnailCarouselProps {
  images: string[];
  selectedImageIndex: number;
  onSelectImage: (index: number) => void;
}

export const ThumbnailCarousel: React.FC<ThumbnailCarouselProps> = ({ images, selectedImageIndex, onSelectImage }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 1,
      overflowX: 'auto',
      pb: 1,
      '&::-webkit-scrollbar': {
        height: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#7c4dff',
        borderRadius: '2px',
      }
    }}>
      {images.map((img, index) => (
        <Box
          key={index}
          onClick={() => onSelectImage(index)}
          sx={{
            minWidth: 70,
            height: 70,
            borderRadius: 2,
            overflow: 'hidden',
            cursor: 'pointer',
            border: selectedImageIndex === index ? '3px solid #7c4dff' : '2px solid #ddd',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: '#7c4dff'
            }
          }}
        >
          <img 
            src={img} 
            alt={`Thumbnail ${index + 1}`}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>
      ))}
    </Box>
  );
};
