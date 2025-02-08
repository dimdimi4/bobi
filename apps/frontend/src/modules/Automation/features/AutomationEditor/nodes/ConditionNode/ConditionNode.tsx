import type { Node, NodeProps } from '@xyflow/react';

import { EditorNode } from '../../ui/EditorNode';

type ConditionNode = Node<{ label: string }, 'condition'>;

export function ConditionNode({ data }: NodeProps<ConditionNode>) {
  return (
    <EditorNode>
      <EditorNode.InputHandle text="Check if..." />
      <EditorNode.BodyContainer>{data.label}</EditorNode.BodyContainer>
      <EditorNode.OutputHandle text="Then" id="then" />
      <EditorNode.OutputHandle text="Otherwise" id="otherwise" altHandle />
    </EditorNode>
  );
}
