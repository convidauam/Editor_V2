import React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Add, Delete, SwapHoriz, LineStyle, Edit } from '@mui/icons-material';

interface ContextMenuProps {
  anchorPosition: { x: number; y: number } | null;
  onClose: () => void;
  onCreateNode: () => void;
  onDeleteNode: () => void;
  onEditNode: () => void; // <-- NUEVO
  onDeleteEdge: () => void;
  onToggleEdgeDirection: () => void;
  onToggleEdgeType: () => void;
  selectedNodeForDelete: string | null;
  selectedEdgeForDelete: string | null;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  anchorPosition,
  onClose,
  onCreateNode,
  onDeleteNode,
  onEditNode, // <-- NUEVO
  onDeleteEdge,
  onToggleEdgeDirection,
  onToggleEdgeType,
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

  const handleEditNode = () => {
    onEditNode();
    onClose();
  };

  const handleDeleteEdge = () => {
    onDeleteEdge();
    onClose();
  };

  const handleToggleEdgeDirection = () => {
    onToggleEdgeDirection();
    onClose();
  };

  const handleToggleEdgeType = () => {
    onToggleEdgeType();
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
        <>
          <MenuItem onClick={handleDeleteNode}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText primary="Eliminar Nodo" />
          </MenuItem>
          <MenuItem onClick={handleEditNode}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Editar Nodo" />
          </MenuItem>
        </>
      )}

      {selectedEdgeForDelete && (
        <>
          <MenuItem onClick={handleDeleteEdge}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText primary="Eliminar Línea" />
          </MenuItem>
          <MenuItem onClick={handleToggleEdgeDirection}>
            <ListItemIcon>
              <SwapHoriz />
            </ListItemIcon>
            <ListItemText primary="Cambiar Orientación" />
          </MenuItem>
          <MenuItem onClick={handleToggleEdgeType}>
            <ListItemIcon>
              <LineStyle />
            </ListItemIcon>
            <ListItemText primary="Alternar Tipo de Línea" />
          </MenuItem>
        </>
      )}
    </Menu>
  );
};