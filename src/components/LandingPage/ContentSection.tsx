import React, { useState, useRef } from 'react';
import { Container, Box } from '@mui/material';
import cardsData from './cards.json';
import { ContentCard } from './ExpandableCard/types';
import { SectionHeader } from './ContentSection/SectionHeader';
import { FirstSection } from './ContentSection/FirstSection';
import { GridSection } from './ContentSection/GridSection';
import { BackgroundOverlay } from './ContentSection/BackgroundOverlay';
import { ExpandedCardContainer } from './ContentSection/ExpandedCardContainer';

const contentCards: ContentCard[] = cardsData as ContentCard[];

export const ContentSection: React.FC = () => {
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const expandedCardRef = useRef<HTMLDivElement>(null);

  const handleExpandCard = (cardId: number) => {
    const newExpandedId = expandedCardId === cardId ? null : cardId;
    setExpandedCardId(newExpandedId);

    if (newExpandedId !== null) {
      setTimeout(() => {
        expandedCardRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 150);
    }
  };

  const renderExpandedCard = () => {
    if (!expandedCardId) return null;

    const expandedCard = contentCards.find(c => c.id === expandedCardId);
    if (!expandedCard) return null;

    // Solo mostrar ExpandedCardContainer en desktop (md+)
    return (
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <ExpandedCardContainer
          card={expandedCard}
          onToggleExpand={() => handleExpandCard(expandedCardId)}
          cardType={expandedCardId <= 3 ? 'medium' : 'small'}
          containerRef={expandedCardRef}
        />
      </Box>
    );
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden', backgroundColor: 'transparent' }}>
      <BackgroundOverlay />

      <Box 
        sx={{ 
          position: 'relative',
          width: '100%',
          minHeight: { xs: 'auto', sm: '180vh', md: '115vh', lg: '100vh' },
          mt: 0,
          pt: 0,
          pb: { xs: 4, sm: 10, md: 0 },
          zIndex: 1,
          overflow: 'visible',
          backgroundColor: 'transparent',
        }}
      >
        <Container maxWidth={false} sx={{ position: 'relative', height: '100%', zIndex: 2, py: { xs: 4, sm: 8, md: 8 }, px: { xs: 2, sm: 4, md: 6, lg: 12 } }}>
          <FirstSection
            contentCards={contentCards}
            expandedCardId={expandedCardId}
            onToggleExpand={handleExpandCard}
          />

          {(expandedCardId === 1 || expandedCardId === 2 || expandedCardId === 3) && renderExpandedCard()}

          <GridSection
            contentCards={contentCards.slice(3)}
            expandedCardId={expandedCardId}
            onToggleExpand={handleExpandCard}
            expandedCardRef={expandedCardRef}
          />
        </Container>
      </Box>

      <SectionHeader />
    </Box>
  );
};
