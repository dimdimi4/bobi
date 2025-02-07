import type { Node, NodeProps } from '@xyflow/react';

import { EditorNode } from '../../ui/EditorNode';

type StartNode = Node<{ label: string }, 'start'>;

export function StartNode({ data }: NodeProps<StartNode>) {
  return (
    <EditorNode start>
      <EditorNode.StartHandle text="Start when..." />
      <EditorNode.BodyContainer>{data.label}</EditorNode.BodyContainer>
      <EditorNode.OutputHandle text="Then" />
    </EditorNode>
  );
}
