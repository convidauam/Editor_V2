import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Node } from 'reactflow';
import { THEME_COLORS, THEME_COLOR_NAMES } from '../../utils/themeColors';

interface NodeEditModalProps {
  open: boolean;
  node: Node | null;
  onClose: () => void;
  onSave: (nodeId: string, newData: any) => void;
}

export const NodeEditModal: React.FC<NodeEditModalProps> = ({
  open,
  node,
  onClose,
  onSave,
}) => {
  const [label, setLabel] = useState('');
  const [themeColor, setThemeColor] = useState<keyof typeof THEME_COLORS>('default');

  useEffect(() => {
    if (node) {
      setLabel(node.data.label || '');
      setThemeColor(node.data.themeColor || 'default');
    }
  }, [node]);

  const handleSave = () => {
    if (node) {
      onSave(node.id, { ...node.data, label, themeColor });
      onClose();
    }
  };

  const handleCancel = () => {
    if (node) {
      setLabel(node.data.label || '');
      setThemeColor(node.data.themeColor || 'default');
    }
    onClose();
  };

  if (!node) return null;

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Editar Nodo
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            autoFocus
            fullWidth
            label="Nombre del Nodo"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            variant="outlined"
            sx={{ mb: 3 }}
          />
          
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Tema/Color</InputLabel>
            <Select
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value as keyof typeof THEME_COLORS)}
              label="Tema/Color"
            >
              {THEME_COLOR_NAMES.map((colorName) => (
                <MenuItem key={colorName} value={colorName}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: THEME_COLORS[colorName],
                        borderRadius: '50%',
                        border: '1px solid #ccc',
                      }}
                    />
                    <Typography sx={{ textTransform: 'capitalize' }}>
                      {colorName === 'default' ? 'Por defecto' : colorName}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Información del Nodo:
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                label={`ID: ${node.id}`} 
                size="small" 
                variant="outlined"
                sx={{ fontFamily: 'monospace' }}
              />
              <Chip 
                label={`Tipo: ${node.type || 'default'}`} 
                size="small" 
                variant="outlined"
              />
              <Chip 
                label={`Posición: (${Math.round(node.position.x)}, ${Math.round(node.position.y)})`} 
                size="small" 
                variant="outlined"
              />
              <Chip 
                label={`Tema: ${themeColor}`} 
                size="small" 
                variant="outlined"
                sx={{ 
                  backgroundColor: THEME_COLORS[themeColor],
                  color: '#fff',
                  '& .MuiChip-label': { color: '#fff' }
                }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={handleCancel} color="inherit">
          Cancelar
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          color="primary"
          disabled={!label.trim()}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 