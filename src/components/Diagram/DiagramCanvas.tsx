import { useEffect } from 'react';
import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Background as ReactFlowBackground,
  Controls,
  MiniMap,
  BackgroundVariant,
  Connection,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useDiagram } from '../../hooks/useDiagram';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { NodeEditModal } from '../NodeEditModal/NodeEditModal';
import { EdgeEditModal } from '../EdgeEditModal/EdgeEditModal';
import { CustomNode } from '../NodeTypes/CustomNode';
import { CustomEdgeWithLabel } from '../EdgeTypes/CustomEdgeWithLabel';
import { useTheme } from '@mui/material/styles';
import { Toolbar } from '../Toolbar/Toolbar';
import ArrowMarker from '../ArrowMarker/ArrowMarker';
import NodeContentModal from './NodeContentModal';

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  'custom-label': CustomEdgeWithLabel,
  arrow: CustomEdgeWithLabel, // Línea tipo flecha
};

const isValidConnection = (connection: Connection) => {
  // Permitir conexiones entre cualquier source y cualquier target
  return true;
};

export const DiagramCanvas: React.FC = () => {
  const theme = useTheme();
  const diagramRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = React.useState(true); // Estado para el indicador de carga
  const [history, setHistory] = React.useState<{ nodes: Node[]; edges: Edge[]; url?: string }[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = React.useState<number>(0); // Índice actual del historial
  const historyLimit = 3; // Número máximo de entradas en el historial
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect, // Usar el onConnect del hook

    onEdgeDoubleClick,
    onPaneContextMenu,
    onNodeContextMenu,
    onEdgeContextMenu,
    setReactFlowInstance,
    reactFlowInstance,
    contextMenu,
    closeContextMenu,
    createNodeFromContextMenu,
    deleteNodeFromContextMenu,
    deleteEdgeFromContextMenu,
    selectedNodeForDelete,
    selectedEdgeForDelete,
    updateNodeData,
    updateEdgeData,
    selectedNodeForEdit,
    selectedEdgeForEdit,
    isEditModalOpen,
    isEdgeEditModalOpen,
    closeEditModal,
    closeEdgeEditModal,
    importFromJson,
    toggleEdgeDirection,
    setNodes,
    setEdges,
    openEditModal,
    modalState,
    handleNodeClick,
    closeModal,
  } = useDiagram();

  const addToHistory = (newEntry: { nodes: Node[]; edges: Edge[]; url?: string }) => {
    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, newEntry];
      if (updatedHistory.length > historyLimit) {
        updatedHistory.shift();
      }

      const state = { index: updatedHistory.length - 1 };
      const url = `/editor?diagram=${state.index}`;
      window.history.pushState(state, '', url);

      setCurrentHistoryIndex(updatedHistory.length - 1); // Actualiza el índice actual

      return updatedHistory;
    });
  };

  const loadFromHistory = async (index: number) => {
    const entry = history[index];
    if (entry) {
      if (entry.url) {
        try {
          // Consultar al backend para verificar si la gráfica ha cambiado

          const response = await fetch(entry.url);
          if (!response.ok) {
            throw new Error(`Error al consultar la URL: ${response.statusText}`);
          }
          const json = await response.json();
          if (
            JSON.stringify(json.nodes) !== JSON.stringify(entry.nodes) ||
            JSON.stringify(json.edges) !== JSON.stringify(entry.edges)
          ) {
            setNodes(json.nodes);
            setEdges(json.edges);
            console.log('La gráfica ha cambiado. Se ha actualizado desde el backend.');
          } else {
            // Si no ha cambiado, usar los datos almacenados en el historial
            setNodes(entry.nodes);
            setEdges(entry.edges);
          }
        } catch (error) {
          console.error('Error al cargar la gráfica desde la URL:', error);
          setNodes(entry.nodes);
          setEdges(entry.edges);
        }
      } else {
        setNodes(entry.nodes);
        setEdges(entry.edges);
        console.log(`Cargando gráfica desde el historial: ${entry.url || 'Sin URL'}`);
      }

      // Solo actualiza el historial del navegador si no estás navegando dentro del historial existente
      if (index !== currentHistoryIndex) {
        const state = { index };
        const url = `/editor?diagram=${index}`;
        window.history.pushState(state, '', url);
      }
    }
  };

  const goBack = () => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(newIndex);
      loadFromHistory(newIndex);
    }
  };

  const goForward = () => {
    if (currentHistoryIndex < history.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(newIndex);
      loadFromHistory(newIndex);
    }
  };

  useEffect(() => {
    const loadDiagram = async () => {
      try {
        // Intentar cargar el diagrama desde el backend si se especifica una URL
        // const start_url = process.env.REACT_APP_START_URL;
        const start_url = "http://localhost:6543/api/v1/node/20d6afc3-d291-493c-b91b-0e772d4336fa";

        if (start_url) {
          const response = await fetch(start_url);
          if (!response.ok) {
            throw new Error(`Error al cargar desde el backend: ${response.statusText}`);
          }
          const json = await response.json();
          if (json.nodes && json.edges) {
            // Asignar posición por defecto si falta
            const nodesWithPosition = json.nodes.map((node: any, idx: number) => ({
              ...node,
              position: node.position && typeof node.position.x === 'number' && typeof node.position.y === 'number'
                ? node.position
                : { x: 100 + idx * 40, y: 100 + idx * 40 },
              data: node.data || { label: node.label, url: node.url, themeColor: 'default', iconUrl: node.iconUrl }
            }));
            setNodes(nodesWithPosition);
            setEdges(json.edges);
            addToHistory({ nodes: nodesWithPosition, edges: json.edges, url: start_url }); // Agregar al historial
            console.log('Diagrama cargado desde el backend.');
            return; // Salir si se cargó correctamente
          } else {
            throw new Error('El JSON recibido del backend no tiene el formato esperado.');
          }
        }

        // Si no se especifica una URL, cargar el diagrama predeterminado
        console.log('No se especificó una URL. Cargando el diagrama predeterminado.');
        const fallbackResponse = await fetch('/Diagramas/MapaDeSitioLineasPR.json');
        if (!fallbackResponse.ok) {
          throw new Error(`Error al cargar el diagrama predeterminado: ${fallbackResponse.statusText}`);
        }
        const fallbackJson = await fallbackResponse.json();
        if (fallbackJson.nodes && fallbackJson.edges) {
          setNodes(fallbackJson.nodes);
          setEdges(fallbackJson.edges);
          addToHistory({ nodes: fallbackJson.nodes, edges: fallbackJson.edges, url: '/Diagramas/MapaDeSitioLineasPR.json' }); // Agregar al historial
          console.log('Diagrama predeterminado cargado correctamente.');
        } else {
          throw new Error('El JSON predeterminado no tiene el formato esperado.');
        }
      } catch (error) {
        console.error('Error al cargar el diagrama:', error);
        alert('No se pudo cargar ningún diagrama.');
      }
    };

    loadDiagram();
  }, [setNodes, setEdges]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state && typeof state.index === 'number') {
        setCurrentHistoryIndex(state.index); // Actualiza el índice actual
        loadFromHistory(state.index);
      } else {
        window.location.href = '/'; // Redirige a la página principal si no hay estado
      }
    };

    window.onpopstate = handlePopState;

    return () => {
      window.onpopstate = null; // Limpia el evento al desmontar el componente
    };
  }, [loadFromHistory]);

  const onPaneClick = useCallback(() => {
    closeContextMenu();
  }, [closeContextMenu]);

  // Nueva función para alternar el tipo de línea
  const toggleEdgeType = useCallback(() => {
    if (!selectedEdgeForDelete) return;

    setEdges((prevEdges) =>
      prevEdges.map((edge) =>
        edge.id === selectedEdgeForDelete
          ? {
            ...edge,
            type: edge.type === 'default' ? 'arrow' : 'default', // Alternar entre 'default' y 'arrow'
            style: {
              stroke: '#000000', // Color negro para ambas líneas
              strokeWidth: 2, // Ancho de línea consistente
            },
            markerEnd: edge.type === 'default' ? 'url(#arrowhead)' : undefined, // Flecha solo para 'arrow'
          }
          : edge
      )
    );
    closeContextMenu();
  }, [selectedEdgeForDelete, setEdges, closeContextMenu]);

  // Función para abrir el modal de edición desde el menú contextual
  const handleEditNodeFromContextMenu = React.useCallback(() => {
    if (selectedNodeForDelete) {
      openEditModal(selectedNodeForDelete);
    }
  }, [selectedNodeForDelete, openEditModal]);

  //funcion creada para saber que nodo fue clickeado, necesaria para el modal
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      handleNodeClick(node);
    },
    [handleNodeClick]
  );

  return (
    <div ref={diagramRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Toolbar
        reactFlowInstance={reactFlowInstance}
        diagramRef={diagramRef}
        onImportJson={importFromJson}
      />
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeDoubleClick={onEdgeDoubleClick}
          onPaneContextMenu={onPaneContextMenu}
          onNodeContextMenu={onNodeContextMenu}
          onEdgeContextMenu={onEdgeContextMenu}
          onPaneClick={onPaneClick}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          isValidConnection={isValidConnection}
          style={{
            backgroundColor: '#636362',
          }}
        >
          <ReactFlowBackground
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color={theme.palette.divider}
          />
          <ArrowMarker id="arrowhead" />
          <Controls />
          <MiniMap
            style={{
              backgroundColor: theme.palette.background.paper,
            }}
          />
        </ReactFlow>
      </ReactFlowProvider>

      <ContextMenu
        anchorPosition={contextMenu}
        onClose={closeContextMenu}
        onCreateNode={createNodeFromContextMenu}
        onDeleteNode={deleteNodeFromContextMenu}
        onEditNode={handleEditNodeFromContextMenu}
        onDeleteEdge={deleteEdgeFromContextMenu}
        onToggleEdgeDirection={toggleEdgeDirection}
        selectedNodeForDelete={selectedNodeForDelete}
        selectedEdgeForDelete={selectedEdgeForDelete}
        onToggleEdgeType={toggleEdgeType}
      />

      <NodeEditModal
        open={isEditModalOpen}
        onClose={closeEditModal}
        node={selectedNodeForEdit}
        onSave={updateNodeData}
      />

      <EdgeEditModal
        open={isEdgeEditModalOpen}
        onClose={closeEdgeEditModal}
        edge={selectedEdgeForEdit}
        nodes={nodes}
        onSave={updateEdgeData}
      />

      <NodeContentModal
        open={modalState.open}
        onClose={closeModal}
        url={modalState.url}
        title={modalState.title}
      />

      {/* Widget de navegación */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
        }}
      >
        <button onClick={goBack} disabled={(currentHistoryIndex ?? 0) <= 0}>
          ← Atrás
        </button>
        <span style={{ margin: '0 1rem' }}>
          {(currentHistoryIndex ?? 0) + 1} / {history.length}
        </span>
        <button onClick={goForward} disabled={(currentHistoryIndex ?? 0) >= history.length - 1}>
          Adelante →
        </button>
      </div>
    </div>
  );
};


