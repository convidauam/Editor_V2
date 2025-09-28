import { useCallback, useState } from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowInstance,
} from 'reactflow';
import { generateNodeId, generateEdgeId } from '../utils/idGenerator';
import { getEdgeLabelBackgroundColor } from '../utils/themeColors';

const initialNodes: Node[] = [
  {
    id: generateNodeId(),
    data: { label: 'Nodo 1', themeColor: 'blue' },
    position: { x: 250, y: 5 },
    type: 'custom',
  },
  {
    id: generateNodeId(),
    data: { label: 'Nodo 2', themeColor: 'green' },
    position: { x: 100, y: 100 },
    type: 'custom',
  },
];

const initialEdges: Edge[] = [
  {
    id: generateEdgeId(),
    source: initialNodes[0].id,
    target: initialNodes[1].id,
    type: 'custom-label',
  },
];

export function useDiagram() {
  // Usa los hooks de ReactFlow para manejar nodos y edges
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Estado para el modal de edición de nodo
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNodeForEdit, setSelectedNodeForEdit] = useState<Node | null>(null);

  // Estado para el modal de edición de edge
  const [isEdgeEditModalOpen, setIsEdgeEditModalOpen] = useState(false);
  const [selectedEdgeForEdit, setSelectedEdgeForEdit] = useState<Edge | null>(null);

  // Estado para el menú contextual
  const [selectedNodeForDelete, setSelectedNodeForDelete] = useState<string | null>(null);
  const [selectedEdgeForDelete, setSelectedEdgeForDelete] = useState<string | null>(null);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((prevEdges) => [
        ...prevEdges,
        {
          id: `${connection.source ?? ''}-${connection.sourceHandle ?? ''}-${connection.target ?? ''}-${connection.targetHandle ?? ''}`,
          source: connection.source ?? '', // Aseguramos que sea una cadena
          target: connection.target ?? '', // Aseguramos que sea una cadena
          sourceHandle: connection.sourceHandle ?? '', // Aseguramos que sea una cadena
          targetHandle: connection.targetHandle ?? '', // Aseguramos que sea una cadena
          type: 'default', // Tipo de línea normal
          style: {
            stroke: '#000000', // Color negro
            strokeWidth: 2, // Ancho de línea consistente
          },
          markerEnd: undefined, // Sin flecha
        } as Edge, // Aseguramos que el objeto cumple con el tipo Edge
      ]);
    },
    [setEdges]
  );

  const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    // Si el nodo tiene una URL, ábrela en una nueva pestaña
    if (node.data && node.data.url) {
      window.open(node.data.url, '_blank');
    }
    // Si no tiene URL, no hagas nada (no abras el modal)
  }, []);

  const onEdgeDoubleClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    setSelectedEdgeForEdit(edge);
    setIsEdgeEditModalOpen(true);
  }, []);

  const onPaneContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  }, []);

  const onNodeContextMenu = useCallback((event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    setSelectedNodeForDelete(node.id);
    setContextMenu({ x: event.clientX, y: event.clientY });
  }, []);

  const onEdgeContextMenu = useCallback((event: React.MouseEvent, edge: Edge) => {
    event.preventDefault();
    setSelectedEdgeForDelete(edge.id);
    setContextMenu({ x: event.clientX, y: event.clientY });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
    setSelectedNodeForDelete(null);
    setSelectedEdgeForDelete(null);
  }, []);

  const createNodeFromContextMenu = useCallback(() => {
    if (!reactFlowInstance || !contextMenu) return;

    const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
    if (!reactFlowBounds) return;

    const position = reactFlowInstance.project({
      x: contextMenu.x - reactFlowBounds.left,
      y: contextMenu.y - reactFlowBounds.top,
    });

    const newNode: Node = {
      id: generateNodeId(),
      data: { label: 'Nuevo nodo', themeColor: 'default' },
      position,
      type: 'custom',
    };

    setNodes((nds) => [...nds, newNode]);
    closeContextMenu();
  }, [reactFlowInstance, contextMenu, setNodes, closeContextMenu]);

  const deleteNodeFromContextMenu = useCallback(() => {
    if (!selectedNodeForDelete) return;
    
    setNodes((nds) => nds.filter((n) => n.id !== selectedNodeForDelete));
    setEdges((eds) => eds.filter((e) => e.source !== selectedNodeForDelete && e.target !== selectedNodeForDelete));
    closeContextMenu();
  }, [selectedNodeForDelete, setNodes, setEdges, closeContextMenu]);

  const deleteEdgeFromContextMenu = useCallback(() => {
    if (!selectedEdgeForDelete) return;
    
    setEdges((eds) => eds.filter((e) => e.id !== selectedEdgeForDelete));
    closeContextMenu();
  }, [selectedEdgeForDelete, setEdges, closeContextMenu]);

  const toggleEdgeDirection = useCallback(() => {
    if (!selectedEdgeForDelete) return;

    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === selectedEdgeForDelete
          ? {
              ...edge,
              data: {
                ...edge.data,
                isReversed: !edge.data?.isReversed, // Cambiamos la orientación
              },
            }
          : edge
      )
    );
    closeContextMenu();
  }, [selectedEdgeForDelete, setEdges, closeContextMenu]);

  const addNode = useCallback((type: string = 'custom', position = { x: 100, y: 100 }) => {
    const newNode: Node = {
      id: generateNodeId(),
      data: { label: `Nuevo ${type}`, themeColor: 'default' },
      position,
      type: 'custom',
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
  }, [setNodes, setEdges]);

  const duplicateNode = useCallback((node: Node) => {
    const newNode: Node = {
      ...node,
      id: generateNodeId(),
      position: { x: node.position.x + 50, y: node.position.y + 50 },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  // Función para abrir el modal de edición de nodo
  const openEditModal = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId) || null;
    setSelectedNodeForEdit(node);
    setIsEditModalOpen(true);
  };

  // Función para cerrar el modal de edición de nodo
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedNodeForEdit(null);
  };

  // Función para actualizar los datos del nodo editado
  const updateNodeData = (nodeId: string, newData: any) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, data: newData } : node
      )
    );
  };

  const updateEdgeData = useCallback((edgeId: string, newData: any) => {
    setEdges((eds) => eds.map((e) => 
      e.id === edgeId ? newData : e
    ));
  }, [setEdges]);

  const closeEdgeEditModal = useCallback(() => {
    setIsEdgeEditModalOpen(false);
    setSelectedEdgeForEdit(null);
  }, []);

  const importFromJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.nodes && json.edges) {
          setNodes(json.nodes as Node[]);
          setEdges(json.edges as Edge[]);
        } else {
          alert('El archivo no contiene un formato válido de nodos y edges.');
        }
      } catch (error) {
        console.error('Error al importar el archivo JSON:', error);
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };
  

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeDoubleClick,
    onEdgeDoubleClick,
    onPaneContextMenu,
    onNodeContextMenu,
    onEdgeContextMenu,
    reactFlowInstance,
    setReactFlowInstance,
    contextMenu,
    closeContextMenu,
    createNodeFromContextMenu,
    deleteNodeFromContextMenu,
    deleteEdgeFromContextMenu,
    toggleEdgeDirection,
    selectedNodeForDelete,
    selectedEdgeForDelete,
    addNode,
    deleteNode,
    duplicateNode,
    updateNodeData,
    updateEdgeData,
    selectedNodeForEdit,
    selectedEdgeForEdit,
    isEditModalOpen,
    isEdgeEditModalOpen,
    openEditModal,
    closeEditModal,
    closeEdgeEditModal,
    importFromJson,
  };
};