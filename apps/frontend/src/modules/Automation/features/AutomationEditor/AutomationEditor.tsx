import { useShallow } from 'zustand/react/shallow';
import { Controls, Background, ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { AppState, useStore } from './store';

import { EditorContainer } from './ui/EditorContainer';

const selector = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export function AutomationEditor() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(selector)
  );

  return (
    <EditorContainer>
      <EditorContainer.Header>Header</EditorContainer.Header>
      <EditorContainer.Body>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background bgColor="var(--mantine-color-gray-1)" />
          <Controls position="top-right" />
        </ReactFlow>
      </EditorContainer.Body>
    </EditorContainer>
  );
}
