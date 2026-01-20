import React from 'react';
import { ContentCard } from '../types';
import { LargeCardView } from './LargeCardView';
import { MediumSmallCardView } from './MediumSmallCardView';

interface CollapsedCardViewProps {
  card: ContentCard;
  cardType: 'large' | 'medium' | 'small';
  onToggleExpand: () => void;
}

export const CollapsedCardView: React.FC<CollapsedCardViewProps> = ({
  card,
  cardType,
  onToggleExpand,
}) => {
  return cardType === 'large' ? (
    <LargeCardView card={card} onToggleExpand={onToggleExpand} />
  ) : (
    <MediumSmallCardView card={card} onToggleExpand={onToggleExpand} />
  );
};
