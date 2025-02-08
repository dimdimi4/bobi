import { useShallow } from 'zustand/react/shallow';
import { Drawer } from '@mantine/core';
import { Controls, Background, ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { AppState, useStore } from './store';

import { EditorContainer } from './ui/EditorContainer';
import { StartNode } from './nodes/StartNode';
import { EndNode } from './nodes/EndNode';
import { ActionNode } from './nodes/ActionNode';
import { ConditionNode } from './nodes/ConditionNode';
import { Message2Node, MessageNode } from './nodes/MessageNode';

const selector = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  selectedNode: state.selectedNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onNodeSelect: state.onNodeSelect,
});

const nodeTypes = {
  start: StartNode,
  end: EndNode,
  action: ActionNode,
  condition: ConditionNode,
  message: MessageNode,
  message2: Message2Node,
};

export function AutomationEditor({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) {
  const {
    nodes,
    edges,
    selectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeSelect,
  } = useStore(useShallow(selector));

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
            onNodeClick={(_, node) => onNodeSelect(node)}
            selectNodesOnDrag={false}
            snapToGrid
          >
            <Background bgColor="var(--mantine-color-gray-1)" />
            <Controls position="top-right" />
          </ReactFlow>
        </EditorContainer.Body>
      </EditorContainer>
      <p>{selectedNode?.id}</p>
    </Drawer>
  );
}
