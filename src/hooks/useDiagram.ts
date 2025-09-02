import { useCallback, useState, useEffect } from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowInstance
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
    type: 'custom-label'
  },
];

export const useDiagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [selectedNodeForEdit, setSelectedNodeForEdit] = useState<Node | null>(null);
  const [selectedEdgeForEdit, setSelectedEdgeForEdit] = useState<Edge | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEdgeEditModalOpen, setIsEdgeEditModalOpen] = useState(false);
  const [selectedNodeForDelete, setSelectedNodeForDelete] = useState<string | null>(null);
  const [selectedEdgeForDelete, setSelectedEdgeForDelete] = useState<string | null>(null);

  // Ya no necesitamos el useEffect para actualizar colores, el componente CustomEdgeWithLabel lo maneja

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      if (!params.source || !params.target) return;

      const newEdge = {
        ...params,
        id: generateEdgeId(),
        type: 'custom-label',
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNodeForEdit(node);
    setIsEditModalOpen(true);
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

  const updateNodeData = useCallback((nodeId: string, newData: any) => {
    setNodes((nds) => nds.map((n) =>
      n.id === nodeId ? { ...n, data: newData } : n
    ));
  }, [setNodes]);

  const updateEdgeData = useCallback((edgeId: string, newData: any) => {
    setEdges((eds) => eds.map((e) =>
      e.id === edgeId ? newData : e
    ));
  }, [setEdges]);

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setSelectedNodeForEdit(null);
  }, []);

  const closeEdgeEditModal = useCallback(() => {
    setIsEdgeEditModalOpen(false);
    setSelectedEdgeForEdit(null);
  }, []);

  // Mejora que solo recibe objeto JSON y maneje errores y alertas
  const importFromJson = useCallback((json: any) => {
    try {
      if (!json || !json.nodes || !json.edges) {
        alert('El archivo no contiene un formato válido de nodos y edges.');
        return;
      }
      setNodes(json.nodes);
      setEdges(json.edges);
    } catch (error) {
      console.error('Error al importar el JSON:', error);
      alert('Error al leer el JSON.');
    }
  }, []);

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
    closeEditModal,
    closeEdgeEditModal,
    importFromJson,
  };
};