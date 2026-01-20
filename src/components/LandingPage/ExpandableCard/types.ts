export interface ContentCard {
  id: number;
  title: string;
  subtitle?: string;
  module: string;
  imageUrl?: string;
  imageGallery?: string[];
  buttonText: string;
  author?: string;
  levels?: string;
  description: string;
}

export interface ExpandableCardProps {
  card: ContentCard;
  isExpanded: boolean;
  onToggleExpand: () => void;
  cardType: 'large' | 'medium' | 'small';
  isSelected?: boolean; // Nueva prop para indicar si está seleccionada
}
