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
        mt: { xs: 3, sm: 4, md: 5 },
        mb: { xs: 3, sm: 5, md: 8 },
        position: 'relative',
        scrollMarginTop: { xs: '80px', sm: '90px', md: '100px' },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: { xs: -12, sm: -15, md: -20 },
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: { xs: '12px solid transparent', sm: '15px solid transparent', md: '20px solid transparent' },
          borderRight: { xs: '12px solid transparent', sm: '15px solid transparent', md: '20px solid transparent' },
          borderBottom: { xs: '12px solid #7c4dff', sm: '15px solid #7c4dff', md: '20px solid #7c4dff' },
          filter: 'drop-shadow(0 -2px 4px rgba(124, 77, 255, 0.3))',
        },
        border: { xs: '2px solid #7c4dff', md: '3px solid #7c4dff' },
        borderRadius: { xs: 2, md: 3 },
        boxShadow: '0 0 30px rgba(124, 77, 255, 0.4), inset 0 0 20px rgba(124, 77, 255, 0.1)',
        background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.05) 0%, rgba(180, 124, 255, 0.05) 100%)',
        padding: { xs: 1, sm: 1.5, md: 2 },
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
