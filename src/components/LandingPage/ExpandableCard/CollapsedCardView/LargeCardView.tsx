import React from 'react';
import { Box, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { ContentCard } from '../types';

interface LargeCardViewProps {
  card: ContentCard;
  onToggleExpand: () => void;
}

export const LargeCardView: React.FC<LargeCardViewProps> = ({ card, onToggleExpand }) => {
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
      
      <Box sx={{ 
        position: 'relative',
        zIndex: 1,
        p: { xs: 2, md: 3 }, 
        display: 'flex', 
        alignItems: 'flex-start', 
        gap: 2,
        backgroundColor: '#FFFFFF66',
        backdropFilter: 'blur(4px)',
      }}>
        <Box
          sx={{
            width: { xs: 40, md: 56 },
            height: { xs: 40, md: 56 },
            borderRadius: '50%',
            backgroundColor: '#9c27b0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Typography sx={{ fontFamily: 'Roboto', color: 'white', fontSize: { xs: '1.25rem', md: '1.75rem' }, fontWeight: 'bold' }}>
            R
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" component="h3" sx={{ fontFamily: 'Roboto', fontWeight: 'bold', mb: 0.5, color: '#1D1B20', fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
            {card.title}
          </Typography>
          <Typography variant="caption" color="#1D1B20" sx={{ fontFamily: 'Roboto', display: 'block', fontSize: { xs: '0.8rem', md: '1rem' } }}>
            {card.module}
          </Typography>
        </Box>

        <Box sx={{ cursor: 'pointer', color: '#000000ff' }}>
          <Typography sx={{ fontSize: '1.5rem', lineHeight: 1 }}>⋮</Typography>
        </Box>
      </Box>

      <Box sx={{ position: 'relative', zIndex: 0, flex: 1, width: '100%' }} />

      {card.author && (
        <Box sx={{position: 'relative', zIndex: 1, px: { xs: 2, md: 3 }, pt: 1.5, pb: 0.8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)' }}>
          <Typography variant="caption" sx={{ fontFamily: 'Roboto', color: '#49454F', fontSize: { xs: '0.75rem', md: '0.9rem' } }}>
            {card.author}
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: 'Roboto', color: '#000000ff', fontSize: { xs: '0.75rem', md: '0.9rem' }, fontWeight: 'bold' }}>
            {card.levels}
          </Typography>
        </Box>
      )}

      <CardContent
        sx={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          p: { xs: 2, sm: 2.5, md: 3 },
          pt: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="body2" sx={{ fontFamily: 'Roboto', color: '#49454F', fontSize: { xs: '0.85rem', md: '1rem' }, lineHeight: 1.6 }}>
          {card.description.substring(0, 100)}...
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
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
