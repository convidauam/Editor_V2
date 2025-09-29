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
    if (!selectedEdgeForDelete) return;

    setEdges((edges) =>
      edges.map((edge) =>
        edge.id === selectedEdgeForDelete
          ? {
              ...edge,
              data: {
                ...edge.data,
                isReversed: !edge.data?.isReversed, // Cambiar la orientación
              },
            }
          : edge
      )
    );

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

export const getNodeThemeColor = (nodeId: string, nodes: any[] | undefined): string => {
  if (!nodes || !Array.isArray(nodes)) {
    console.error('Error: nodes is undefined or not an array');
    return THEME_COLORS.default;
  }

  const node = nodes.find((n) => n.id === nodeId);
  return node?.data?.themeColor ? getThemeColor(node.data.themeColor) : THEME_COLORS.default;
};

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
  const [color, setColor] = useState<keyof typeof THEME_COLORS>('default');

  useEffect(() => {
    if (edge) {
      setLabel(edge.label?.toString() || '');
      setStyle(edge.style?.strokeDasharray ? 'dashed' : 'default');
      setColor(edge.data?.color || 'default'); // Cargar el color actual de la línea
    }
  }, [edge]);

  const handleSave = () => {
    if (!edge) return;

    const updatedEdge = {
      ...edge,
      label,
      type: 'custom-label',
      style: {
        ...edge.style,
        strokeDasharray: style === 'dashed' ? '5,5' : undefined,
        stroke: THEME_COLORS[color], // Aplicar el color seleccionado
      },
      data: {
        ...edge.data,
        color, // Guardar el color seleccionado en los datos de la línea
      },
    };

    console.log('Edge data:', edge.data);

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

          <FormControl fullWidth>
            <InputLabel>Color de línea</InputLabel>
            <Select
              value={color}
              onChange={(e) => setColor(e.target.value as keyof typeof THEME_COLORS)}
              label="Color de línea"
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
                    {colorName === 'default' ? 'Por defecto' : colorName}
                  </Box>
                </MenuItem>
              ))}
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