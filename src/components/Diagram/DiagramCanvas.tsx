import { useEffect } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';

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

  useEffect(() => {
    const loadDiagram = async () => {
      setIsLoading(true); // Mostrar el indicador de carga
      try {
        // Simular un retraso de 3 segundos
        await new Promise((resolve) => setTimeout(resolve, 3000));
        // Intentar cargar el diagrama desde el backend si se especifica una URL
        const start_url = process.env.REACT_APP_START_URL;

        if (start_url) {
          const response = await fetch(start_url);
          if (!response.ok) {
            throw new Error(`Error al cargar desde el backend: ${response.statusText}`);
          }
          const json = await response.json();
          if (json.nodes && json.edges) {
            setNodes(json.nodes);
            setEdges(json.edges);
            console.log('Diagrama cargado desde el backend.');
            return;
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
          console.log('Diagrama predeterminado cargado correctamente.');
        } else {
          throw new Error('El JSON predeterminado no tiene el formato esperado.');
        }
      } catch (error) {
        console.error('Error al cargar el diagrama:', error);
        alert('No se pudo cargar ningún diagrama.');
      } finally {
        setIsLoading(false); // Ocultar el indicador de carga
      }
    };

    loadDiagram();
  }, [setNodes, setEdges]);

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

  return (
    <div ref={diagramRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#d5d5d2', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
        </>
      )}
    </div>
  );
};
