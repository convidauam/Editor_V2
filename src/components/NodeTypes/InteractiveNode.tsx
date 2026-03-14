import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Box, Typography } from '@mui/material';

export const InteractiveNode: React.FC<NodeProps> = ({ data, selected }) => (
  <Box
    sx={{
      backgroundColor: '#fff3e0',
      border: selected ? '2px solid #ef6c00' : '1px solid #ef6c00',
      borderRadius: 5,
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
    <Typography
      variant="body2"
      sx={{
        color: '#e65100',
        textAlign: 'center',
        fontWeight: 500,
        wordBreak: 'break-word',
        flex: 1,
      }}
    >
      {data.label || 'Interactivo'}
    </Typography>
    <Handle type="target" position={Position.Top} id="top-target" style={{ background: '#555' }} isConnectable={true} />
    <Handle type="source" position={Position.Top} id="top-source" style={{ background: '#555' }} isConnectable={true} />
    <Handle type="target" position={Position.Bottom} id="bottom-target" style={{ background: '#555' }} isConnectable={true} />
    <Handle type="source" position={Position.Bottom} id="bottom-source" style={{ background: '#555' }} isConnectable={true} />
    <Handle type="target" position={Position.Left} id="left-target" style={{ background: '#555' }} isConnectable={true} />
    <Handle type="source" position={Position.Left} id="left-source" style={{ background: '#555' }} isConnectable={true} />
    <Handle type="target" position={Position.Right} id="right-target" style={{ background: '#555' }} isConnectable={true} />
    <Handle type="source" position={Position.Right} id="right-source" style={{ background: '#555' }} isConnectable={true} />
  </Box>
);
