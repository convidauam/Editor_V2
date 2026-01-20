import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { ExpandableCard } from '../ExpandableCard';
import { ContentCard } from '../ExpandableCard/types';
import { ExpandedCardContainer } from './ExpandedCardContainer';

interface GridSectionProps {
  contentCards: ContentCard[];
  expandedCardId: number | null;
  onToggleExpand: (id: number) => void;
  expandedCardRef: React.RefObject<HTMLDivElement>;
}

export const GridSection: React.FC<GridSectionProps> = ({
  contentCards,
  expandedCardId,
  onToggleExpand,
  expandedCardRef,
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  
  const getColumnsPerRow = () => {
    if (isXs) return 1;
    if (isSm || isMd) return 2;
    return 3;
  };
  
  const columnsPerRow = getColumnsPerRow();
  const expandedCardIndex = contentCards.findIndex(card => card.id === expandedCardId);
  
  const getExpandedCardInsertIndex = () => {
    if (expandedCardIndex === -1) return -1;
    const rowNumber = Math.floor(expandedCardIndex / columnsPerRow);
    return (rowNumber + 1) * columnsPerRow - 1;
  };
  
  const insertIndex = getExpandedCardInsertIndex();
  const renderItems: JSX.Element[] = [];
  
  contentCards.forEach((card, index) => {
    renderItems.push(
      <ExpandableCard
        key={`card-${card.id}`}
        card={card}
        isExpanded={false}
        onToggleExpand={() => onToggleExpand(card.id)}
        cardType="small"
        isSelected={expandedCardId === card.id}
      />
    );
    
    if (index === insertIndex && expandedCardId) {
      const expandedCard = contentCards.find(c => c.id === expandedCardId);
      if (expandedCard) {
        renderItems.push(
          <Box key={`expanded-${expandedCardId}`} sx={{ gridColumn: '1 / -1' }}>
            <ExpandedCardContainer
              card={expandedCard}
              onToggleExpand={() => onToggleExpand(expandedCardId)}
              cardType="small"
              containerRef={expandedCardRef}
            />
          </Box>
        );
      }
    }
  });
  
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: 'repeat(2, 1fr)', 
          md: 'repeat(2, 1fr)', 
          lg: 'repeat(3, 1fr)' 
        },
        gap: { xs: 4, sm: 5, md: 6, lg: 8 },
        mb: { xs: 4, sm: 6, md: 8 },
        position: 'relative',
      }}
    >
      {renderItems}
    </Box>
  );
};
