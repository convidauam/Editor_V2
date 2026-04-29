
import React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Menu as MuiMenu } from '@mui/material';
import { Add, Delete, SwapHoriz, LineStyle, Edit, Category } from '@mui/icons-material';

interface ContextMenuProps {
  anchorPosition: { x: number; y: number } | null;
  onClose: () => void;
  onCreateNode: () => void;
  onDeleteNode: () => void;
  onEditNode: () => void;
  onDeleteEdge: () => void;
  onToggleEdgeDirection: () => void;
  onToggleEdgeType: () => void;
  selectedNodeForDelete: string | null;
  selectedEdgeForDelete: string | null;
  onChangeNodeType?: (type: string) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  anchorPosition,
  onClose,
  onCreateNode,
  onDeleteNode,
  onEditNode,
  onDeleteEdge,
  onToggleEdgeDirection,
  onToggleEdgeType,
  selectedNodeForDelete,
  selectedEdgeForDelete,
  onChangeNodeType,
}) => {
    // Estado para el submenú de tipo de nodo
    const [nodeTypeMenuAnchor, setNodeTypeMenuAnchor] = React.useState<null | HTMLElement>(null);

    const nodeTypes = [
      { label: 'Custom', value: 'custom' },
      { label: 'Conector', value: 'conector' },
      { label: 'Texto simple', value: 'texto_simple' },
      { label: 'Texto enriquecido', value: 'texto_enriquecido' },
      { label: 'Imágenes', value: 'imagenes' },
      { label: 'Animación', value: 'animacion' },
      { label: 'Página web', value: 'pagina_web' },
      { label: 'Interactivos', value: 'interactivos' },
      { label: 'Audio', value: 'audio' },
      { label: 'Audiovisual', value: 'audiovisual' },
    ];

    const handleNodeTypeMenuOpen = (event: React.MouseEvent<HTMLLIElement>) => {
      setNodeTypeMenuAnchor(event.currentTarget);
    };

    const handleNodeTypeMenuClose = () => {
      setNodeTypeMenuAnchor(null);
    };

    const handleNodeTypeSelect = (type: string) => {
      if (onChangeNodeType) {
        onChangeNodeType(type);
      }
      handleNodeTypeMenuClose();
      onClose();
    };
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

          {/* // Submenú para elegir tipo de nodo, implementado dentro de "Editar Nodo"
          <MenuItem onClick={handleNodeTypeMenuOpen}>
            <ListItemIcon>
              <Category />
            </ListItemIcon>
            <ListItemText primary="Elegir tipo de nodo" />
          </MenuItem>
          <MuiMenu
            anchorEl={nodeTypeMenuAnchor}
            open={Boolean(nodeTypeMenuAnchor)}
            onClose={handleNodeTypeMenuClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            {nodeTypes.map((type) => (
              <MenuItem key={type.value} onClick={() => handleNodeTypeSelect(type.value)}>
                <ListItemText primary={type.label} />
              </MenuItem>
            ))}
          </MuiMenu>
          */}

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