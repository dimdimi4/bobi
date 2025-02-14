import { useRef } from 'react';

import { EditorNode, useEditorStore } from '../store';
import { useCenterNode } from './use-center-node';

export function useAutomationEditor() {
  const nodes = useEditorStore((s) => s.nodes);
  const edges = useEditorStore((s) => s.edges);
  const selectedNode = useEditorStore((s) => s.selectedNode);
  const onNodesChange = useEditorStore((s) => s.onNodesChange);
  const onEdgesChange = useEditorStore((s) => s.onEdgesChange);
  const onConnect = useEditorStore((s) => s.onConnect);
  const onNodeSelect = useEditorStore((s) => s.onNodeSelect);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const { centerNode } = useCenterNode({ reactFlowWrapper });

  const handleNodeSelect = (newNode?: EditorNode) => {
    onNodeSelect(newNode);

    if (newNode) {
      centerNode(newNode);
    }
  };

  return {
    nodes,
    edges,
    selectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeSelect,
    handleNodeSelect,
    reactFlowWrapper,
  };
}
