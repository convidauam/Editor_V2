import React from 'react';
import { Box } from '@mui/material';
import { ExpandableCard } from '../ExpandableCard';
import { ContentCard } from '../ExpandableCard/types';

interface ExpandedCardContainerProps {
  card: ContentCard;
  onToggleExpand: () => void;
  cardType: 'large' | 'medium' | 'small';
  containerRef?: React.RefObject<HTMLDivElement>;
}

export const ExpandedCardContainer: React.FC<ExpandedCardContainerProps> = ({
  card,
  onToggleExpand,
  cardType,
  containerRef,
}) => {
  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        mt: { xs: 5, sm: 6, md: 5 },
        mb: { xs: 4, sm: 6, md: 8 },
        position: 'relative',
        scrollMarginTop: '100px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderBottom: '20px solid #7c4dff',
          filter: 'drop-shadow(0 -2px 4px rgba(124, 77, 255, 0.3))',
        },
        border: '3px solid #7c4dff',
        borderRadius: 3,
        boxShadow: '0 0 30px rgba(124, 77, 255, 0.4), inset 0 0 20px rgba(124, 77, 255, 0.1)',
        background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.05) 0%, rgba(180, 124, 255, 0.05) 100%)',
        padding: 2,
        animation: 'pulse-border 2s ease-in-out infinite',
        '@keyframes pulse-border': {
          '0%, 100%': {
            boxShadow: '0 0 30px rgba(124, 77, 255, 0.4), inset 0 0 20px rgba(124, 77, 255, 0.1)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(124, 77, 255, 0.6), inset 0 0 30px rgba(124, 77, 255, 0.2)',
          },
        },
      }}
    >
      <ExpandableCard
        card={card}
        isExpanded={true}
        onToggleExpand={onToggleExpand}
        cardType={cardType}
      />
    </Box>
  );
};
