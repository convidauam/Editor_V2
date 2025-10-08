import { useEffect, useState } from 'react'; // Importa useState
import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Background as ReactFlowBackground,
  Controls,
  MiniMap,
  BackgroundVariant,
  Connection,
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
import CircularProgress from '@mui/material/CircularProgress'; // Importa el componente CircularProgress
import { NavigationWidget } from './NavigationWidget'; // Importa el widget de navegación

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

const hasGraphChanged = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) {
      throw new Error(`Error al verificar cambios en la gráfica: ${response.statusText}`);
    }

    // Supongamos que el backend envía un encabezado `Last-Modified`
    const lastModified = response.headers.get('Last-Modified');
    if (lastModified) {
      console.log(`Última modificación: ${lastModified}`);
      // Aquí puedes implementar lógica adicional para comparar fechas si es necesario
    }

    // Retorna `true` si detectas que la gráfica ha cambiado
    return false; // Cambia esto según la lógica de tu backend
  } catch (error) {
    console.error('Error al verificar cambios en la gráfica:', error);
    return false;
  }
};

export const DiagramCanvas: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [graphHistory, setGraphHistory] = useState<{ nodes: any[]; edges: any[]; url?: string }[]>([]);
  const [currentGraphIndex, setCurrentGraphIndex] = useState(-1);
  const [maxHistorySize, setMaxHistorySize] = useState(10);

  const theme = useTheme();
  const diagramRef = useRef<HTMLDivElement>(null);
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect, // Usar el onConnect del hook
    onNodeDoubleClick,
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
  } = useDiagram();

  const loadDiagram = async (url?: string) => {
    setIsLoading(true);
    try {
      if (url && (await hasGraphChanged(url))) {
        alert('La gráfica ha cambiado en el backend. Recargando...');
      }

      // El resto de la lógica de carga permanece igual
      let nodes: any[] = [];
      let edges: any[] = [];

      if (url) {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error al cargar desde el backend: ${response.statusText}`);
        }
        const json = await response.json();
        if (json.nodes && json.edges) {
          nodes = json.nodes;
          edges = json.edges;
        } else {
          throw new Error('El JSON recibido del backend no tiene el formato esperado.');
        }
      } else {
        const fallbackResponse = await fetch('/Diagramas/MapaDeSitioLineasPR.json');
        if (!fallbackResponse.ok) {
          throw new Error(`Error al cargar el diagrama predeterminado: ${fallbackResponse.statusText}`);
        }
        const fallbackJson = await fallbackResponse.json();
        if (fallbackJson.nodes && fallbackJson.edges) {
          nodes = fallbackJson.nodes;
          edges = fallbackJson.edges;
        } else {
          throw new Error('El JSON predeterminado no tiene el formato esperado.');
        }
      }

// Actualizar el historial de gráficas
      const newGraph = { nodes, edges, url };
      const updatedHistory = [...graphHistory.slice(0, currentGraphIndex + 1), newGraph];
      if (updatedHistory.length > maxHistorySize) {
        updatedHistory.shift(); // Eliminar la gráfica más antigua si se excede el tamaño máximo
      }
      setGraphHistory(updatedHistory);
      setCurrentGraphIndex(updatedHistory.length - 1);

// Actualizar el historial del navegador
      window.history.pushState({ index: updatedHistory.length - 1 }, '', '');

      setNodes(nodes);
      setEdges(edges);
    } catch (error) {
      console.error('Error al cargar el diagrama:', error);
      alert('No se pudo cargar ningún diagrama.');
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = async () => {
    if (currentGraphIndex > 0) {
      const prevIndex = currentGraphIndex - 1;
      const { nodes, edges, url } = graphHistory[prevIndex];

      if (nodes && edges) {
        // Si los nodos y bordes están en memoria, simplemente actualízalos
        setNodes(nodes);
        setEdges(edges);
      } else if (url) {
        // Si no están en memoria, recarga desde la URL
        await loadDiagram(url);
      }

      setCurrentGraphIndex(prevIndex);
      window.history.pushState({ index: prevIndex }, '', '');
    }
  };

  const goForward = async () => {
    if (currentGraphIndex < graphHistory.length - 1) {
      const nextIndex = currentGraphIndex + 1;
      const { nodes, edges, url } = graphHistory[nextIndex];

      if (nodes && edges) {
        // Si los nodos y bordes están en memoria, simplemente actualízalos
        setNodes(nodes);
        setEdges(edges);
      } else if (url) {
        // Si no están en memoria, recarga desde la URL
        await loadDiagram(url);
      }

      setCurrentGraphIndex(nextIndex);
      window.history.pushState({ index: nextIndex }, '', '');
    }
  };

  useEffect(() => {
    loadDiagram();
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const index = event.state?.index ?? -1;
      if (index >= 0 && index < graphHistory.length) {
        const { nodes, edges } = graphHistory[index];
        setNodes(nodes);
        setEdges(edges);
        setCurrentGraphIndex(index);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [graphHistory]);

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

  // Función para crear un nuevo canvas
  const createNewCanvas = () => {
    setNodes([]); // Limpia los nodos
    setEdges([]); // Limpia las conexiones
  };

  return (
    <div ref={diagramRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <CircularProgress />
        </div>
      )}

      {!isLoading && (
        <>
          <Toolbar
            reactFlowInstance={reactFlowInstance}
            diagramRef={diagramRef}
            onImportJson={importFromJson}
            onCreateNewCanvas={createNewCanvas} // Pasar la función al Toolbar
          />
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodeClick={(event, node) => {
                console.log('Nodo picado:', node.data);
                console.log("ID del nodo", node.id);
              }}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeDoubleClick={onNodeDoubleClick}
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
                backgroundColor: '#636362', // puse un color menos feo 
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
          <NavigationWidget
            onBack={goBack}
            onForward={goForward}
            canGoBack={currentGraphIndex > 0}
            canGoForward={currentGraphIndex < graphHistory.length - 1}
          />
          <input
            type="number"
            value={maxHistorySize}
            onChange={(e) => setMaxHistorySize(Number(e.target.value))}
          />
        </>
      )}
    </div>
  );
};
