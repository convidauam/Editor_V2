import React from 'react';
import { Box } from '@mui/material';
import { ContentCard } from '../types';
import { ImageGallery } from './ImageGallery';
import { CardInfo } from './CardInfo';

interface ExpandedCardViewProps {
  card: ContentCard;
  images: string[];
  selectedImageIndex: number;
  onToggleExpand: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  onSelectImage: (index: number) => void;
}

export const ExpandedCardView: React.FC<ExpandedCardViewProps> = (props) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', md: 'row' },
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      animation: 'fadeInContent 0.6s ease-out 0.1s both',
      '@keyframes fadeInContent': {
        '0%': {
          opacity: 0,
          transform: 'translateY(10px)',
        },
        '100%': {
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
    }}>
      <ImageGallery 
        images={props.images}
        selectedImageIndex={props.selectedImageIndex}
        cardTitle={props.card.title}
      />
      
      <CardInfo {...props} />
    </Box>
  );
};
