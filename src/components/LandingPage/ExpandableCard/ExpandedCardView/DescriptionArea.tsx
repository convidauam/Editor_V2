import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

interface DescriptionAreaProps {
  description: string;
}

export const DescriptionArea: React.FC<DescriptionAreaProps> = ({ description }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Resetear el scroll al inicio cuando se monta el componente
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [description]);

  return (
    <Box 
      ref={scrollRef}
      sx={{ 
        flex: 1, 
        overflowY: 'auto',
        maxHeight: { xs: '250px', sm: '300px', md: 'none' },
        p: { xs: 2, sm: 2.5, md: 3 },
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': { width: '8px' }, 
        '&::-webkit-scrollbar-thumb': { 
          backgroundColor: '#7c4dff', 
          borderRadius: '4px' 
        } 
      }}
    >
      <Typography variant="body1" sx={{ 
        fontFamily: 'Roboto', 
        lineHeight: 1.8, 
        color: '#49454F', 
        columnCount: { xs: 1, sm: 1, md: 2 }, 
        columnGap: 4, 
        fontSize: { xs: '0.85rem', sm: '0.875rem', md: '0.9rem' }, 
        textAlign: 'justify',
        marginTop: 0,
        paddingTop: 0
      }}>
        {description}
      </Typography>
    </Box>
  );
};
