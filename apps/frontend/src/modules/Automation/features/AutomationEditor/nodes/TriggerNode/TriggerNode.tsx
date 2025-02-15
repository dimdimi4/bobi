import type { Node, NodeProps } from '@xyflow/react';

import { AutomationTask } from '@/data/sources/api';

import { EditorNode } from '../../ui/EditorNode';

import { TriggerReceivedMessageNode } from './TriggerReceivedMessageNode';

type TriggersTypes = Pick<AutomationTask, 'trigger_receivedMessage'>;
type TriggerNode = Node<TriggersTypes, 'trigger'>;

export function TriggerNode({ data }: NodeProps<TriggerNode>) {
  return (
    <EditorNode start>
      <EditorNode.StartHandle text="Start when..." />
      <EditorNode.BodyContainer>
        {data.trigger_receivedMessage && (
          <TriggerReceivedMessageNode trigger={data.trigger_receivedMessage} />
        )}
      </EditorNode.BodyContainer>
      <EditorNode.OutputHandle text="Then" />
    </EditorNode>
  );
}
