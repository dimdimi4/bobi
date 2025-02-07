import { useShallow } from 'zustand/react/shallow';
import { Drawer } from '@mantine/core';
import { Controls, Background, ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { AppState, useStore } from './store';

import { EditorContainer } from './ui/EditorContainer';
import { StartNode } from './nodes/StartNode';

const selector = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const nodeTypes = {
  start: StartNode,
};

export function AutomationEditor({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(selector)
  );

  return (
    <Drawer
      position="bottom"
      size="100%"
      opened={opened}
      onClose={onClose}
      closeOnEscape={false}
      padding={0}
      title="Create Automation"
      styles={{
        content: {
          display: 'flex',
          flexDirection: 'column',
        },
        body: {
          flex: 1,
        },
      }}
    >
      <EditorContainer>
        <EditorContainer.Body>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            snapToGrid
          >
            <Background bgColor="var(--mantine-color-gray-1)" />
            <Controls position="top-right" />
          </ReactFlow>
        </EditorContainer.Body>
      </EditorContainer>
    </Drawer>
  );
}
