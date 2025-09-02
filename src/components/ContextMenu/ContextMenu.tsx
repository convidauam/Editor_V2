import React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Add, Delete, SwapHoriz, ArrowForward } from '@mui/icons-material';
import { Edge } from 'reactflow';
import { THEME_COLORS, getThemeColor } from '../../utils/themeColors';

interface ContextMenuProps {
  anchorPosition: { x: number; y: number } | null;
  onClose: () => void;
  onCreateNode: () => void;
  onDeleteNode: () => void;
  onDeleteEdge: () => void;
  onToggleEdgeDirection: () => void;
  onToggleArrow: () => void;
  setEdges: (updater: (edges: Edge[]) => Edge[]) => void; // Tipo corregido
  selectedNodeForDelete: string | null;
  selectedEdgeForDelete: string | null;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  anchorPosition,
  onClose,
  onCreateNode,
  onDeleteNode,
  onDeleteEdge,
  onToggleEdgeDirection,
  onToggleArrow,
  setEdges,
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

  const handleToggleEdgeDirection = () => {
    onToggleEdgeDirection();
    onClose();
  };

  const handleToggleArrow = () => {
    if (!selectedEdgeForDelete) return;

    setEdges((edges) =>
      edges.map((edge) =>
        edge.id === selectedEdgeForDelete
          ? { ...edge, data: { ...edge.data, hasArrow: !edge.data?.hasArrow } }
          : edge
      )
    );
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
          <MenuItem onClick={handleToggleArrow}>
            <ListItemIcon>
              <ArrowForward />
            </ListItemIcon>
            <ListItemText primary="Alternar Flecha" />
          </MenuItem>
        </>
      )}
    </Menu>
  );
};

export const getNodeThemeColor = (nodeId: string, nodes: any[] | undefined): string => {
  if (!nodes || !Array.isArray(nodes)) {
    console.error('Error: nodes is undefined or not an array');
    return THEME_COLORS.default;
  }

  const node = nodes.find((n) => n.id === nodeId);
  return node?.data?.themeColor ? getThemeColor(node.data.themeColor) : THEME_COLORS.default;
};