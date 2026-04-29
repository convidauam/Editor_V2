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
import { ConectorNode } from '../NodeTypes/ConectorNode';
import { SimpleTextNode } from '../NodeTypes/SimpleTextNode';
import { RichTextNode } from '../NodeTypes/RichTextNode';
import { ImageNode } from '../NodeTypes/ImageNode';
import { AnimationNode } from '../NodeTypes/AnimationNode';
import { WebPageNode } from '../NodeTypes/WebPageNode';
import { InteractiveNode } from '../NodeTypes/InteractiveNode';
import { AudioNode } from '../NodeTypes/AudioNode';
import { AudiovisualNode } from '../NodeTypes/AudiovisualNode';
import { CustomEdgeWithLabel } from '../EdgeTypes/CustomEdgeWithLabel';
import { useTheme } from '@mui/material/styles';
import { Toolbar } from '../Toolbar/Toolbar';
import ArrowMarker from '../ArrowMarker/ArrowMarker';
import NodeContentModal from './NodeContentModal';

const nodeTypes = {
  custom: CustomNode,
  conector: ConectorNode,
  texto_simple: SimpleTextNode,
  texto_enriquecido: RichTextNode,
  imagenes: ImageNode,
  animacion: AnimationNode,
  pagina_web: WebPageNode,
  interactivos: InteractiveNode,
  audio: AudioNode,
  audiovisual: AudiovisualNode,
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
  
  // HISTORIAL DE NAVEGACIÓN ENTRE GRÁFICAS
  // history: almacena las gráficas visitadas (nodos, edges y url opcional)
  // currentHistoryIndex: índice actual dentro del historial
  // historyLimit: máximo de entradas guardadas en el historial

  const [history, setHistory] = React.useState<{ nodes: Node[]; edges: Edge[]; url?: string }[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = React.useState<number>(0); // Índice actual del historial
  const historyLimit = 3; // Número máximo de entradas en el historial

  // Agrega una nueva gráfica al historial y sincroniza el historial del navegador
  const addToHistory = (newEntry: { nodes: Node[]; edges: Edge[]; url?: string }) => {
    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, newEntry];
      if (updatedHistory.length > historyLimit) {
        updatedHistory.shift();
      }

      // Sincroniza el historial del navegador (pushState)
      // const state = { index: updatedHistory.length - 1 };
      // const url = `/editor?diagram=${state.index}`;
      // window.history.pushState(state, '', url);

      setCurrentHistoryIndex(updatedHistory.length - 1); // Actualiza el índice actual

      return updatedHistory;
    });
  };

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
    pendingNodePosition,
    setPendingNodePosition,
  } = useDiagram();

  // Agrega una nueva gráfica al historial y sincroniza el historial del navegador
  /* const addToHistory = (newEntry: { nodes: Node[]; edges: Edge[]; url?: string }) => {
    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, newEntry];
      if (updatedHistory.length > historyLimit) {
        updatedHistory.shift();
      }

      // Sincroniza el historial del navegador (pushState)
      const state = { index: updatedHistory.length - 1 };
      const url = `/editor?diagram=${state.index}`;
      window.history.pushState(state, '', url);

      setCurrentHistoryIndex(updatedHistory.length - 1); // Actualiza el índice actual

      return updatedHistory;
    });
  };
  */

  // Carga una gráfica específica desde el historial (por índice)
  // Si tiene URL, consulta al backend para ver si ha cambiado; si no, usa los datos guardados
  // También sincroniza el historial del navegador si es necesario

  /*
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
      // if (index !== currentHistoryIndex) {
      //   const state = { index };
      //   const url = `/editor?diagram=${index}`;
      //   window.history.pushState(state, '', url);
      // }
    }
  };
*/

  // --- FUNCIONES DE NAVEGACIÓN ENTRE GRÁFICAS (ATRÁS / ADELANTE) ---

 /* 
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
*/

  useEffect(() => {
    const loadDiagram = async () => {
      try {
        // Intentar cargar desde sessionStorage primero
        const storedUrl = sessionStorage.getItem('REACT_APP_START_URL');
        const storedDiagram = sessionStorage.getItem('REACT_APP_DIAGRAM_DATA');

        if (storedDiagram) {
          // Cargar diagrama desde sessionStorage
          const json = JSON.parse(storedDiagram);
          if (json.nodes && json.edges) {
            setNodes(json.nodes);
            setEdges(json.edges);
            addToHistory({ nodes: json.nodes, edges: json.edges });
            console.log('Diagrama cargado desde sessionStorage.');
            return;
          }
        }

        if (storedUrl) {
          // Intentar cargar desde backend
          try {
            const response = await fetch(storedUrl);
            if (response.ok) {
              const json = await response.json();
              if (json.nodes && json.edges) {
                setNodes(json.nodes);
                setEdges(json.edges);
                addToHistory({ nodes: json.nodes, edges: json.edges, url: storedUrl });
                console.log('Diagrama cargado desde el backend.');
                return;
              }
            }
          } catch (backendError) {
            console.warn('Backend no disponible, cargando diagrama por defecto:', backendError);
          }
        }

        // Cargar diagrama predeterminado
        console.log('Cargando diagrama predeterminado.');
        const fallbackResponse = await fetch('/Diagramas/MapaDeSitioLineasPR.json');
        if (fallbackResponse.ok) {
          const fallbackJson = await fallbackResponse.json();
          if (fallbackJson.nodes && fallbackJson.edges) {
            setNodes(fallbackJson.nodes);
            setEdges(fallbackJson.edges);
            //addToHistory({ nodes: fallbackJson.nodes, edges: fallbackJson.edges });
            console.log('Diagrama predeterminado cargado.');
          }
        }
      } catch (error) {
        console.error('Error al cargar el diagrama:', error);
        // No mostrar alert, solo log
      }
    };

    loadDiagram();
  }, [setNodes, setEdges]);

  // --- HOOK flechas del navegador ---
  // Permite que las flechas del navegador (adelante/atrás) funcionen con el historial de gráficas

  /*
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
  */

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
        onSave={(nodeId, newData) => {
          // Si nodeId está vacío, es un nuevo nodo
          if (!nodeId && pendingNodePosition) {
            // Crear el nodo con los datos del modal
            setNodes((nds) => [
              ...nds,
              {
                id: Math.random().toString(36).substr(2, 9), // id aleatorio
                data: { label: newData.label, themeColor: newData.themeColor },
                position: pendingNodePosition,
                type: newData.type || 'custom',
              },
            ]);
            setPendingNodePosition(null);
            closeEditModal();
          } else {
            // Edición de nodo existente
            updateNodeData(nodeId, newData);
            closeEditModal();
          }
        }}
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

    </div>
  );
};


