import { Position, type Node, type NodeProps } from '@xyflow/react';

import { AutomationTask } from '@/data/sources/api';

import { EditorNode } from '../../ui/EditorNode';

import { TriggerReceivedMessageNode } from './TriggerReceivedMessageNode';
import { Text } from '@mantine/core';

type TriggersTypes = Pick<AutomationTask, 'trigger_receivedMessage'>;
type TriggerNode = Node<TriggersTypes, 'trigger'>;

export function TriggerNode({ data }: NodeProps<TriggerNode>) {
  return (
    <EditorNode>
      <EditorNode.HandleContainer padded>
        <Text fw={500} size="sm" c="gray" component="div">
          Start when...
        </Text>
      </EditorNode.HandleContainer>
      <EditorNode.Section>
        <EditorNode.Body>
          {data.trigger_receivedMessage && (
            <TriggerReceivedMessageNode
              trigger={data.trigger_receivedMessage}
            />
          )}
        </EditorNode.Body>
      </EditorNode.Section>
      <EditorNode.HandleContainer padded justify="flex-end" output>
        <Text fw={600} size="sm" c="dimmed" component="div">
          Then
        </Text>
        <EditorNode.OutputHandle position={Position.Right} />
      </EditorNode.HandleContainer>
    </EditorNode>
  );
}
