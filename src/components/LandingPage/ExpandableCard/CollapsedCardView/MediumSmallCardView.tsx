import React from 'react';
import { Box, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { ContentCard } from '../types';

interface MediumSmallCardViewProps {
  card: ContentCard;
  onToggleExpand: () => void;
}

export const MediumSmallCardView: React.FC<MediumSmallCardViewProps> = ({ card, onToggleExpand }) => {
  return (
    <>
      <CardMedia
        component="img"
        image={card.imageUrl}
        alt={card.title}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />
      
      {/* Espaciador que empuja el contenido hacia abajo */}
      <Box sx={{ flex: 1, position: 'relative', zIndex: 0 }} />
      
      <CardContent
        sx={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: '#FFFFFFB2',
          backdropFilter: 'blur(4px)',
          p: { xs: 1.5, sm: 2, md: 2.5 },
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" component="h3" sx={{ fontFamily: 'Roboto', fontWeight: 'bold', mb: 0.3, color: '#49454F', fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}>
            {card.title}
          </Typography>
          {card.subtitle && (
            <Typography variant="caption" color="#49454F" sx={{ fontFamily: 'Roboto', display: 'block', fontSize: { xs: '0.65rem', md: '0.75rem' }, mb: 0.2 }}>
              {card.subtitle}
            </Typography>
          )}
          <Typography variant="caption" color="#49454F" sx={{ fontFamily: 'Roboto', display: 'block', fontWeight: 600, fontSize: { xs: '0.6rem', md: '0.7rem' } }}>
            {card.module}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1.5 }, alignItems: 'center', flexShrink: 0, ml: { xs: 1, md: 2 } }}>
          <Button
            variant="text"
            onClick={onToggleExpand}
            sx={{
              color: '#7c4dff',
              textTransform: 'none',
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              '&:hover': { backgroundColor: 'rgba(124, 77, 255, 0.08)' },
            }}
          >
            Ver más
          </Button>
          <Box
            component="img"
            src="/SVG_general/Artboard22.svg"
            alt="Iniciar"
            sx={{ height: { xs: 28, md: 40 }, cursor: 'pointer' }}
          />
        </Box>
      </CardContent>
    </>
  );
};
