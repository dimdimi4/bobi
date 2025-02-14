import type { Node, NodeProps } from '@xyflow/react';

import { EditorNode } from '../../ui/EditorNode';
import { AutomationTask, TriggerReceivedMessageTask } from '@/data/sources/api';
import { Stack, Text } from '@mantine/core';

type TriggersTypes = Pick<AutomationTask, 'trigger_receivedMessage'>;
type TriggerNode = Node<TriggersTypes, 'trigger'>;

export function TriggerNode({ data }: NodeProps<TriggerNode>) {
  return (
    <EditorNode start>
      <EditorNode.StartHandle text="Start when..." />
      <EditorNode.BodyContainer>
        {data.trigger_receivedMessage && (
          <TriggerReceivedMessage trigger={data.trigger_receivedMessage} />
        )}
      </EditorNode.BodyContainer>
      <EditorNode.OutputHandle text="Then" />
    </EditorNode>
  );
}

function TriggerReceivedMessage({
  trigger,
}: {
  trigger: TriggerReceivedMessageTask;
}) {
  return (
    <Stack gap={2}>
      {trigger.condition === 'any' && (
        <Text size="lg" fw={700}>
          any message received
        </Text>
      )}
      {trigger.condition === 'exact' && (
        <Text size="lg" fw={700}>
          exact message received:
        </Text>
      )}
      {trigger.condition === 'contains' && (
        <Text size="lg" fw={700}>
          received message contains:
        </Text>
      )}
      {trigger.templates &&
        trigger.templates?.map((template) => (
          <code key={template}>{template}</code>
        ))}
    </Stack>
  );
}
