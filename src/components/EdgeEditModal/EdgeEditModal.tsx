import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Edge, Node } from 'reactflow';
import { getEdgeLabelBackgroundColor } from '../../utils/themeColors';

interface EdgeEditModalProps {
  open: boolean;
  onClose: () => void;
  edge: Edge | null;
  nodes: Node[];
  onSave: (edgeId: string, newData: any) => void;
}

export const EdgeEditModal: React.FC<EdgeEditModalProps> = ({
  open,
  onClose,
  edge,
  nodes,
  onSave,
}) => {
  const [label, setLabel] = useState('');
  const [style, setStyle] = useState<'default' | 'dashed'>('default');

  useEffect(() => {
    if (edge) {
      setLabel(edge.label?.toString() || '');
      setStyle(edge.style?.strokeDasharray ? 'dashed' : 'default');
    }
  }, [edge]);

  const handleSave = () => {
    if (!edge) return;

    const updatedEdge = {
      ...edge,
      label,
      type: 'custom-label',
      style: style === 'dashed' ? { strokeDasharray: '5,5' } : {}, // Aplicamos el estilo punteado
    };

    onSave(edge.id, updatedEdge);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Línea</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Nombre de la línea"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            fullWidth
            variant="outlined"
          />
          
          <FormControl fullWidth>
            <InputLabel>Estilo de línea</InputLabel>
            <Select
              value={style}
              onChange={(e) => setStyle(e.target.value as 'default' | 'dashed')}
              label="Estilo de línea"
            >
              <MenuItem value="default">Línea sólida</MenuItem>
              <MenuItem value="dashed">Línea punteada</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};