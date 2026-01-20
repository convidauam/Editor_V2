import React from 'react';
import { Box, Typography } from '@mui/material';

interface DescriptionAreaProps {
  description: string;
}

export const DescriptionArea: React.FC<DescriptionAreaProps> = ({ description }) => {
  return (
    <Box sx={{ 
      flex: 1, 
      overflowY: 'auto', 
      p: 3, 
      '&::-webkit-scrollbar': { width: '8px' }, 
      '&::-webkit-scrollbar-thumb': { 
        backgroundColor: '#7c4dff', 
        borderRadius: '4px' 
      } 
    }}>
      <Typography variant="body1" sx={{ 
        fontFamily: 'Roboto', 
        lineHeight: 1.8, 
        color: '#49454F', 
        columnCount: 2, 
        columnGap: 4, 
        fontSize: '0.9rem', 
        textAlign: 'justify' 
      }}>
        {description}
      </Typography>
    </Box>
  );
};
