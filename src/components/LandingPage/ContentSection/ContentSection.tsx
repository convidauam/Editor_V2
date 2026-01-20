import React, { useState, useRef } from 'react';
import { Container, Box } from '@mui/material';
import cardsData from './cards.json';
import { ExpandableCard } from '../ExpandableCard';
import { ContentCard } from '../ExpandableCard/types';
import { SectionHeader } from './SectionHeader';
import { FirstSection } from './FirstSection';
import { GridSection } from './GridSection';
import { BackgroundOverlay } from './BackgroundOverlay';

const contentCards: ContentCard[] = cardsData as ContentCard[];

export const ContentSection: React.FC = () => {
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const expandedCardRef123 = useRef<HTMLDivElement>(null);
  const expandedCardRefGrid = useRef<HTMLDivElement>(null);

  // Función centralizada que maneja todo el proceso de abrir una card
  const handleExpandCard = (cardId: number) => {
    // Verificar si la card ya está abierta (para cerrarla)
    const newExpandedId = expandedCardId === cardId ? null : cardId;
    setExpandedCardId(newExpandedId);

    // Si se abrió una card, hacer scroll después de renderizar
    if (newExpandedId !== null) {
      setTimeout(() => {
        let targetRef: React.RefObject<HTMLDivElement>;
        
        // Determinar qué ref usar según el ID de la card
        if (newExpandedId >= 1 && newExpandedId <= 3) {
          targetRef = expandedCardRef123;
        } else {
          targetRef = expandedCardRefGrid;
        }

        // Hacer scroll suave hacia la card expandida
        targetRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 150);
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
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
        }}
      >
        <Container maxWidth={false} sx={{ position: 'relative', height: '100%', zIndex: 2, py: { xs: 4, sm: 8, md: 8 }, px: { xs: 2, sm: 4, md: 6, lg: 12 } }}>
          <FirstSection
            contentCards={contentCards}
            expandedCardId={expandedCardId}
            onToggleExpand={handleExpandCard}
          />

          {/* Zona de expansión fija para cards 1, 2, 3 */}
          {(expandedCardId === 1 || expandedCardId === 2 || expandedCardId === 3) && (
            <Box
              ref={expandedCardRef123}
              sx={{
                width: '100%',
                mt: { xs: 5, sm: 6, md: 5 },
                mb: { xs: 4, sm: 6, md: 8 },
                position: 'relative',
                zIndex: 10,
                scrollMarginTop: '100px',
              }}
            >
              <ExpandableCard
                card={contentCards.find(c => c.id === expandedCardId)!}
                isExpanded={true}
                onToggleExpand={() => handleExpandCard(expandedCardId)}
                cardType="medium"
              />
            </Box>
          )}

          <GridSection
            contentCards={contentCards.slice(3)}
            expandedCardId={expandedCardId}
            onToggleExpand={handleExpandCard}
            expandedCardRef={expandedCardRefGrid}
          />
        </Container>
      </Box>

      <SectionHeader />
    </Box>
  );
};