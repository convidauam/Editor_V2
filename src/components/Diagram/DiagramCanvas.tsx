import React, { useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Background as ReactFlowBackground,
  Controls,
  MiniMap,
  BackgroundVariant,
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
import { json } from 'stream/consumers';

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  'custom-label': CustomEdgeWithLabel,
};

export const DiagramCanvas: React.FC = () => {
  const theme = useTheme();
  const diagramRef = useRef<HTMLDivElement>(null);
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
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
  } = useDiagram();

  // Conexión entre api.py e importación automática de JSON
  useEffect(() => {
    fetch("http://localhost:6543/api/v1/honeycombs/default")
      .then((res) => res.json())
      .then((json) => importFromJson(json))
      .catch((err) => console.error("Error al cargar honeycomb:", err));
  }, [importFromJson]);

  const onPaneClick = useCallback(() => {
    closeContextMenu();
  }, [closeContextMenu]);

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
          style={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <ReactFlowBackground
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color={theme.palette.divider}
          />
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
        onDeleteEdge={deleteEdgeFromContextMenu}
        selectedNodeForDelete={selectedNodeForDelete}
        selectedEdgeForDelete={selectedEdgeForDelete}
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
    </div>
  );
};