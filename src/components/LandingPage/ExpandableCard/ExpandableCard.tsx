import React, { useState, useEffect, useRef } from 'react';
import { Card, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const cardRef = useRef<HTMLDivElement>(null);
  
  // En móviles, usa isSelected para determinar si está expandida
  // En desktop, usa isExpanded (que viene del ExpandedCardContainer)
  const shouldShowExpanded = isMobile ? isSelected : isExpanded;

  // Hacer scroll a la tarjeta cuando se expande en móvil
  useEffect(() => {
    if (isMobile && isSelected && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      }, 100);
    }
  }, [isMobile, isSelected]);

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Card
      ref={cardRef}
      elevation={3}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: shouldShowExpanded ? { xs: 'column', md: 'row' } : 'column',
        height: shouldShowExpanded ? { xs: 'auto', sm: 'auto', md: '600px', lg: '650px' } : 
          cardType === 'large' ? { xs: 580, sm: 650, md: 740 } :
          cardType === 'medium' ? { xs: 250, sm: 280, md: 340 } :
          { xs: 300, sm: 330, md: 360, lg: 420 },
        maxHeight: shouldShowExpanded ? { xs: '85vh', sm: '80vh', md: '650px' } : 'none',
        borderRadius: { xs: '15px', md: '20px' },
        overflow: 'hidden',
        boxShadow: isSelected 
          ? '0 0 20px rgba(124, 77, 255, 0.5)' 
          : (shouldShowExpanded ? '0 8px 32px rgba(0, 0, 0, 0.12)' : '0 4px 16px rgba(0, 0, 0, 0.08)'),
        border: isSelected ? '3px solid #7c4dff' : 'none',
        transition: 'all 0.3s ease',
        transform: !shouldShowExpanded && cardType === 'medium' 
          ? { xs: 'none', md: 'perspective(1000px) rotateY(-2deg)' } 
          : 'none',
        transformOrigin: 'center center',
        zIndex: shouldShowExpanded ? 10 : 1,
        backgroundColor: '#ffffff',
      }}
    >
      {shouldShowExpanded ? (
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
