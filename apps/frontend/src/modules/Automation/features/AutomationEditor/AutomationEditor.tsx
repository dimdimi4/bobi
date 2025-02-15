import { Badge, Button, Group, Text } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';
import {
  Controls,
  Background,
  ReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { AutomationEditorProps } from './types';
import { StoreProvider } from './store/StoreProvider';

import { EditorContainer } from './ui/EditorContainer';

import { TriggerNode } from './nodes/TriggerNode';
import { EndNode } from './nodes/EndNode';
import { ActionNode } from './nodes/ActionNode';
import { ConditionNode } from './nodes/ConditionNode';
import { Message2Node, MessageNode } from './nodes/MessageNode';
import { useAutomationEditor } from './hooks/use-automation-editor';
import { useAddStep } from './hooks/use-add-step';

const nodeTypes = {
  trigger: TriggerNode,
  end: EndNode,
  action: ActionNode,
  condition: ConditionNode,
  message: MessageNode,
  message2: Message2Node,
};

export function AutomationEditor(props: AutomationEditorProps) {
  return (
    <StoreProvider automation={props.automation}>
      <ReactFlowProvider>
        <AutomationEditorInner {...props} />
      </ReactFlowProvider>
    </StoreProvider>
  );
}

function AutomationEditorInner({ onExit }: AutomationEditorProps) {
  const {
    reactFlowWrapper,
    nodes,
    edges,
    selectedNode,
    handleNodeSelect,
    handlePaneClick,
    handleNodeChanges,
    handleEdgeChanges,
    handleConnect,
  } = useAutomationEditor();

  const { addMessageStep } = useAddStep();

  return (
    <EditorContainer>
      <EditorContainer.Body ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={handleNodeChanges}
          onEdgesChange={handleEdgeChanges}
          onNodeDragStop={(_, node, nodes) => {}}
          onConnect={handleConnect}
          onNodeClick={(_, node) => handleNodeSelect(node)}
          onPaneClick={() => handlePaneClick()}
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
                <Button variant="default" size="xs" onClick={addMessageStep}>
                  Add message step
                </Button>
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
  );
}
