import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Box, Typography } from '@mui/material';
import { getThemeColor } from '../../utils/themeColors';

export const CustomNode: React.FC<NodeProps> = ({ data, selected }) => {
  const themeColor = data.themeColor ? getThemeColor(data.themeColor) : '#1976d2';
  
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        border: selected ? '2px solid #1976d2' : '1px solid #555',
        borderRadius: 1,
        minWidth: 150,
        minHeight: 40,
        position: 'relative',
        boxShadow: selected ? 2 : 1,
      }}
    >
      {/* Línea de tema en la parte superior */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          backgroundColor: themeColor,
          borderRadius: '4px 4px 0 0',
        }}
      />
      
      {/* Contenido del nodo */}
      <Box sx={{ padding: 2, paddingTop: 2.5 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            textAlign: 'center',
            fontWeight: 500,
            wordBreak: 'break-word',
          }}
        >
          {data.label}
        </Typography>
      </Box>
      
      {/* Handles para conexiones */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
      />
    </Box>
  );
}; 