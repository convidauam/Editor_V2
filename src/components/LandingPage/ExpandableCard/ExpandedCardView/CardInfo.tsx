import React from 'react';
import { Box } from '@mui/material';
import { ContentCard } from '../types';
import { NavigationControls } from './NavigationControls';
import { CardHeader } from './CardHeader';
import { AuthorInfo } from './AuthorInfo';
import { DescriptionArea } from './DescriptionArea';
import { ActionButtons } from './ActionButtons';

interface CardInfoProps {
  card: ContentCard;
  images: string[];
  selectedImageIndex: number;
  onToggleExpand: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  onSelectImage: (index: number) => void;
}

export const CardInfo: React.FC<CardInfoProps> = ({
  card,
  images,
  selectedImageIndex,
  onToggleExpand,
  onPrevImage,
  onNextImage,
  onSelectImage,
}) => {
  return (
    <Box sx={{ 
      flex: '0 0 65%',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      animation: 'slideInRight 0.5s ease-out 0.1s both',
      '@keyframes slideInRight': {
        '0%': {
          opacity: 0,
          transform: 'translateX(30px)',
        },
        '100%': {
          opacity: 1,
          transform: 'translateX(0)',
        },
      },
    }}>
      <NavigationControls
        hasMultipleImages={images.length > 1}
        onPrevImage={onPrevImage}
        onNextImage={onNextImage}
        onClose={onToggleExpand}
      />

      <CardHeader
        card={card}
        images={images}
        selectedImageIndex={selectedImageIndex}
        onSelectImage={onSelectImage}
      />

      {card.author && <AuthorInfo author={card.author} levels={card.levels} />}

      <DescriptionArea description={card.description} />

      <ActionButtons />
    </Box>
  );
};
