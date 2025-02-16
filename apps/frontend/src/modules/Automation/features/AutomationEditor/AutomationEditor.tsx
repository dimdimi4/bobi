import {
  Controls,
  Background,
  ReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';

import { AutomationEditorProps } from './types';
import { StoreProvider } from './store/StoreProvider';

import { EditorContainer } from './ui/EditorContainer';

import { AutomationEditorHeader } from './AutomationEditorHeader';

import { TriggerNode } from './nodes/TriggerNode';
import { EndNode } from './nodes/EndNode';
import { ActionNode } from './nodes/ActionNode';
import { ConditionNode } from './nodes/ConditionNode';
import { Message2Node, MessageNode } from './nodes/MessageNode';
import { useAutomationEditor } from './hooks/use-automation-editor';
import { useUpdateStepPositions } from './hooks/use-update-positions';
import { useCreateConnection } from './hooks/use-create-connection';
import { useDeleteConnections } from './hooks/use-delete-connections';
import { useDeleteSteps } from './hooks/use-delete-steps';
import { TelegramSendMessage } from './forms/TelegramSendMessage';

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
  } = useAutomationEditor();

  const { handleStepPositionChange } = useUpdateStepPositions();
  const { handleDeleteSteps } = useDeleteSteps();
  const { handleCreateConnection } = useCreateConnection();
  const { handleDeleteConnections } = useDeleteConnections();

  return (
    <EditorContainer>
      <EditorContainer.Header>
        <AutomationEditorHeader onExit={onExit} />
      </EditorContainer.Header>
      <EditorContainer.Content>
        <EditorContainer.Body>
          <ReactFlow
            ref={reactFlowWrapper}
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={handleNodeChanges}
            onEdgesChange={handleEdgeChanges}
            onNodeDragStop={(_, _1, nodes) => handleStepPositionChange(nodes)}
            onConnect={handleCreateConnection}
            onNodeClick={(_, node) => handleNodeSelect(node)}
            onPaneClick={() => handlePaneClick()}
            onEdgesDelete={handleDeleteConnections}
            onNodesDelete={handleDeleteSteps}
            selectNodesOnDrag={false}
            snapToGrid
            // deleteKeyCode={null}
          >
            <Background bgColor="var(--mantine-color-gray-1)" />
            <Controls position="bottom-left" />
          </ReactFlow>
        </EditorContainer.Body>
        <EditorContainer.SidePanel opened={!!selectedNode}>
          {selectedNode?.data.action_telegram_sendMessage && (
            <TelegramSendMessage
              task={selectedNode?.data.action_telegram_sendMessage}
            />
          )}
        </EditorContainer.SidePanel>
      </EditorContainer.Content>
    </EditorContainer>
  );
}
