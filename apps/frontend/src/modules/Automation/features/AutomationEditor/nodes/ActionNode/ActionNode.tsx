import type { Node, NodeProps } from '@xyflow/react';

import { EditorNode } from '../../ui/EditorNode';

type ActionNode = Node<{ label: string }, 'action'>;

export function ActionNode({ data }: NodeProps<ActionNode>) {
  return (
    <EditorNode>
      <EditorNode.InputHandle text="Do this..." />
      <EditorNode.BodyContainer>{data.label}</EditorNode.BodyContainer>
      <EditorNode.OutputHandle text="Then" id="right-1" />
    </EditorNode>
  );
}
