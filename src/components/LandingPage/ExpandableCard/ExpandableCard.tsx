import React, { useState } from 'react';
import { Card } from '@mui/material';
import { ExpandableCardProps } from './types';
import { CollapsedCardView } from './CollapsedCardView';
import { ExpandedCardView } from './ExpandedCardView';

export const ExpandableCard: React.FC<ExpandableCardProps> = ({ 
  card, 
  isExpanded, 
  onToggleExpand,
  cardType, 
  isSelected = false
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = card.imageGallery || [card.imageUrl].filter(Boolean) as string[];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Card
      elevation={3}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: isExpanded ? 'row' : 'column',
        height: isExpanded ? { xs: 'auto', md: '800px' } : 
          cardType === 'large' ? { xs: 580, sm: 650, md: 740 } :
          cardType === 'medium' ? { xs: 250, sm: 280, md: 340 } :
          { xs: 300, sm: 330, md: 360, lg: 420 },
        borderRadius: { xs: '15px', md: '20px' },
        overflow: 'hidden',
        boxShadow: isSelected 
          ? '0 0 20px rgba(124, 77, 255, 0.5)' 
          : (isExpanded ? '0 8px 32px rgba(0, 0, 0, 0.12)' : '0 4px 16px rgba(0, 0, 0, 0.08)'),
        border: isSelected ? '3px solid #7c4dff' : 'none',
        transition: 'all 0.3s ease',
        transform: !isExpanded && cardType === 'medium' 
          ? { xs: 'none', md: 'perspective(1000px) rotateY(-2deg)' } 
          : 'none',
        transformOrigin: 'center center',
        zIndex: isExpanded ? 10 : 1,
        backgroundColor: '#ffffff',
      }}
    >
      {isExpanded ? (
        <ExpandedCardView
          card={card}
          images={images}
          selectedImageIndex={selectedImageIndex}
          onToggleExpand={onToggleExpand}
          onPrevImage={handlePrevImage}
          onNextImage={handleNextImage}
          onSelectImage={setSelectedImageIndex}
        />
      ) : (
        <CollapsedCardView
          card={card}
          cardType={cardType}
          onToggleExpand={onToggleExpand}
        />
      )}
    </Card>
  );
};
