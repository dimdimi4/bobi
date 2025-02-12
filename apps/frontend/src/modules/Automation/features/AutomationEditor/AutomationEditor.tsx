import { useShallow } from 'zustand/react/shallow';
import {
  Controls,
  Background,
  ReactFlow,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { AppNode, AppState, useStore } from './store';

import { EditorContainer } from './ui/EditorContainer';
import { StartNode } from './nodes/StartNode';
import { EndNode } from './nodes/EndNode';
import { ActionNode } from './nodes/ActionNode';
import { ConditionNode } from './nodes/ConditionNode';
import { Message2Node, MessageNode } from './nodes/MessageNode';
import { Badge, Button, Group, Text } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';
import { useRef } from 'react';

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

export function AutomationEditor({ onExit }: { onExit: () => void }) {
  return (
    <ReactFlowProvider>
      <AutomationEditorInner onExit={onExit} />
    </ReactFlowProvider>
  );
}

function AutomationEditorInner({ onExit }: { onExit: () => void }) {
  const {
    nodes,
    edges,
    selectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeSelect,
  } = useStore(useShallow(selector));

  const { setCenter } = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const handleNodeSelect = (newNode?: AppNode) => {
    onNodeSelect(newNode);
    if (newNode) {
      const node = nodes.find((n) => n.id === newNode.id);
      if (node && reactFlowWrapper.current) {
        // Get node dimensions from the DOM element
        const nodeElement = document.querySelector(`[data-id="${node.id}"]`);
        const rect = nodeElement?.getBoundingClientRect();

        // Get the viewport dimensions and calculate the container width
        // Get the container width from the wrapper ref
        const containerWidth =
          reactFlowWrapper.current.getBoundingClientRect().width;

        // Calculate the offset to shift the node to 2/3 of the viewport
        const offsetX = containerWidth / 6; // (1/2 - 1/3 = 1/6) of viewport width

        // Calculate center position by adding half the node's dimensions
        const centerX = node.position.x + (rect?.width ?? 0) / 2;
        const centerY = node.position.y + (rect?.height ?? 0) / 2;

        // Apply the offset to position at 2/3
        setCenter(centerX + offsetX, centerY, { duration: 150, zoom: 1 });
      }
    }
  };

  return (
    <>
      <EditorContainer>
        <EditorContainer.Body ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(_, node) => handleNodeSelect(node)}
            onPaneClick={() => handleNodeSelect()}
            selectNodesOnDrag={false}
            snapToGrid
          >
            <EditorContainer.Header>
              <Group justify="space-between" gap="xs">
                <Group justify="flex-end" gap="xs">
                  <Button
                    leftSection={<IconLogout2 size={14} />}
                    variant="subtle"
                    color="gray"
                    size="xs"
                    onClick={onExit}
                  >
                    Exit Editor
                  </Button>
                  <Badge variant="filled" color="gray" size="lg">
                    Draft
                  </Badge>
                </Group>
                <Group justify="flex-end" gap="xs">
                  <Button variant="default" size="xs" onClick={onExit}>
                    Discard Changes
                  </Button>
                  <Button variant="filled" size="xs" onClick={onExit}>
                    Apply Changes
                  </Button>
                </Group>
              </Group>
            </EditorContainer.Header>
            <EditorContainer.SidePanel opened={!!selectedNode}>
              <Text>Hello world</Text>
            </EditorContainer.SidePanel>
            <Background bgColor="var(--mantine-color-gray-1)" />
            <Controls position="bottom-left" />
          </ReactFlow>
        </EditorContainer.Body>
      </EditorContainer>
    </>
  );
}
