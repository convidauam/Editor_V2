import React from 'react';
import { Box } from '@mui/material';
import { ExpandableCard } from '../ExpandableCard';
import { ContentCard } from '../ExpandableCard/types';

interface FirstSectionProps {
  contentCards: ContentCard[];
  expandedCardId: number | null;
  onToggleExpand: (id: number) => void;
}

export const FirstSection: React.FC<FirstSectionProps> = ({
  contentCards,
  expandedCardId,
  onToggleExpand,
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1.5fr 1.4fr' },
        gap: { xs: 4, sm: 5, md: 15 },
        mb: { xs: 4, sm: 6, md: 8 },
        pt: { xs: 8, sm: 8, md: 8 }
      }}
    >
      {/* Card 1 */}
      <ExpandableCard
        card={contentCards[0]}
        isExpanded={false}
        onToggleExpand={() => onToggleExpand(contentCards[0].id)}
        cardType="large"
        isSelected={expandedCardId === 1}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4, sm: 5, md: 8 } }}>
        {/* Card 2 */}
        <ExpandableCard
          card={contentCards[1]}
          isExpanded={false}
          onToggleExpand={() => onToggleExpand(contentCards[1].id)}
          cardType="medium"
          isSelected={expandedCardId === 2}
        />

        {/* Card 3 */}
        <ExpandableCard
          card={contentCards[2]}
          isExpanded={false}
          onToggleExpand={() => onToggleExpand(contentCards[2].id)}
          cardType="medium"
          isSelected={expandedCardId === 3}
        />
      </Box>
    </Box>
  );
};
