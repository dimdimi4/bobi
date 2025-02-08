import type { Node, NodeProps } from '@xyflow/react';

import { EditorNode } from '../../ui/EditorNode';

type EndNode = Node<{ label: string }, 'start'>;

export function EndNode({ data }: NodeProps<EndNode>) {
  return (
    <EditorNode end>
      <EditorNode.InputHandle text="End here!" />
      <EditorNode.BodyContainer>{data.label}</EditorNode.BodyContainer>
    </EditorNode>
  );
}
