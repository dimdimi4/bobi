import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { EditorState, EditorNode, useStore } from '../store';
import { AutomationEditorProps } from '../types';
import { useCenterNode } from './use-center-node';

const selector = (state: EditorState) => ({
  nodes: state.nodes,
  edges: state.edges,
  selectedNode: state.selectedNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onNodeSelect: state.onNodeSelect,
});

export function useAutomationEditor({
  automation,
  version,
}: Pick<AutomationEditorProps, 'automation' | 'version'>) {
  const {
    nodes,
    edges,
    selectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeSelect,
  } = useStore(useShallow(selector));

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
