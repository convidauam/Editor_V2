import React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

interface ContextMenuProps {
  anchorPosition: { x: number; y: number } | null;
  onClose: () => void;
  onCreateNode: () => void;
  onDeleteNode: () => void;
  onDeleteEdge: () => void;
  selectedNodeForDelete: string | null;
  selectedEdgeForDelete: string | null;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  anchorPosition,
  onClose,
  onCreateNode,
  onDeleteNode,
  onDeleteEdge,
  selectedNodeForDelete,
  selectedEdgeForDelete,
}) => {
  const handleCreateNode = () => {
    onCreateNode();
    onClose();
  };

  const handleDeleteNode = () => {
    onDeleteNode();
    onClose();
  };

  const handleDeleteEdge = () => {
    onDeleteEdge();
    onClose();
  };

  return (
    <Menu
      open={!!anchorPosition}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        anchorPosition
          ? { top: anchorPosition.y, left: anchorPosition.x }
          : undefined
      }
    >
      {!selectedNodeForDelete && !selectedEdgeForDelete && (
        <MenuItem onClick={handleCreateNode}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Crear Nuevo Nodo" />
        </MenuItem>
      )}
      
      {selectedNodeForDelete && (
        <MenuItem onClick={handleDeleteNode}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Eliminar Nodo" />
        </MenuItem>
      )}

      {selectedEdgeForDelete && (
        <MenuItem onClick={handleDeleteEdge}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Eliminar Línea" />
        </MenuItem>
      )}
    </Menu>
  );
}; 