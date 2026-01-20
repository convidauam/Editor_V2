import React from 'react';
import { Box, Typography } from '@mui/material';

interface AuthorInfoProps {
  author: string;
  levels?: string;
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ author, levels }) => {
  return (
    <Box sx={{ 
      px: 3, 
      py: 1.5, 
      borderBottom: '1px solid #e0e0e0', 
      display: 'flex', 
      justifyContent: 'space-between', 
      backgroundColor: '#fafafa' 
    }}>
      <Typography variant="body2" sx={{ fontFamily: 'Roboto', color: '#666', fontSize: '0.85rem' }}>
        {author}
      </Typography>
      {levels && (
        <Typography variant="body2" sx={{ fontFamily: 'Roboto', color: '#666', fontWeight: 'bold', fontSize: '0.85rem' }}>
          {levels}
        </Typography>
      )}
    </Box>
  );
};
