import React from 'react';
import { Box, Typography } from '@mui/material';

interface AuthorInfoProps {
  author: string;
  levels?: string;
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ author, levels }) => {
  return (
    <Box sx={{ 
      px: { xs: 2, sm: 2.5, md: 3 }, 
      py: { xs: 1.2, sm: 1.5 }, 
      borderBottom: '1px solid #e0e0e0', 
      display: 'flex', 
      justifyContent: 'space-between', 
      backgroundColor: '#fafafa',
      flexWrap: { xs: 'wrap', sm: 'nowrap' },
      gap: { xs: 1, sm: 0 }
    }}>
      <Typography variant="body2" sx={{ 
        fontFamily: 'Roboto', 
        color: '#666', 
        fontSize: { xs: '0.8rem', sm: '0.85rem' }
      }}>
        {author}
      </Typography>
      {levels && (
        <Typography variant="body2" sx={{ 
          fontFamily: 'Roboto', 
          color: '#666', 
          fontWeight: 'bold', 
          fontSize: { xs: '0.8rem', sm: '0.85rem' }
        }}>
          {levels}
        </Typography>
      )}
    </Box>
  );
};
