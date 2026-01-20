import React from 'react';
import { Box, Typography } from '@mui/material';
import { ContentCard } from '../types';
import { ThumbnailCarousel } from './ThumbnailCarousel';

interface CardHeaderProps {
  card: ContentCard;
  images: string[];
  selectedImageIndex: number;
  onSelectImage: (index: number) => void;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  card,
  images,
  selectedImageIndex,
  onSelectImage,
}) => {
  return (
    <Box sx={{ p: 3, pt: 2, borderBottom: '1px solid #e0e0e0' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: '#7c4dff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Typography sx={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {card.title.charAt(0)}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ 
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            color: '#1D1B20',
            fontSize: '1.1rem',
          }}>
            {card.title}
          </Typography>
          <Typography variant="body2" sx={{ 
            fontFamily: 'Roboto',
            color: '#666',
            fontSize: '0.9rem',
          }}>
            {card.module}
          </Typography>
        </Box>
      </Box>

      <ThumbnailCarousel
        images={images}
        selectedImageIndex={selectedImageIndex}
        onSelectImage={onSelectImage}
      />
    </Box>
  );
};
