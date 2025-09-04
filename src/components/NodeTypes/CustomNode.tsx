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
        minHeight: 60,
        position: 'relative',
        boxShadow: selected ? 2 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        gap: '8px',
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

      {/* Icono del nodo */}
      {data.iconUrl && (
        <Box
          component="img"
          src={data.iconUrl}
          alt={data.label}
          sx={{
            width: 100, // Duplicamos el tamaño del ancho
            height: 100, // Duplicamos el tamaño del alto
            objectFit: 'contain',
            borderRadius: '50%',
            border: '1px solid #ccc',
          }}
        />
      )}

      {/* Contenido del nodo */}
      <Typography
        variant="body2"
        sx={{
          color: 'text.primary',
          textAlign: 'center',
          fontWeight: 500,
          wordBreak: 'break-word',
          flex: 1,
        }}
      >
        {data.label}
      </Typography>

      {/* Handles para conexiones */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        style={{ background: '#555' }}
        isConnectable={true}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        style={{ background: '#555' }}
        isConnectable={true}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        style={{ background: '#555' }}
        isConnectable={true}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        style={{ background: '#555' }}
        isConnectable={true}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{ background: '#555' }}
        isConnectable={true}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={{ background: '#555' }}
        isConnectable={true}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={{ background: '#555' }}
        isConnectable={true}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={{ background: '#555' }}
        isConnectable={true}
      />
    </Box>
  );
};