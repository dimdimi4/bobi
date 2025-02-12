import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useReactFlow } from '@xyflow/react';

import { EditorState, EditorNode, useStore } from '../store';
import { Automation } from '@/data/sources/api';

const selector = (state: EditorState) => ({
  nodes: state.nodes,
  edges: state.edges,
  selectedNode: state.selectedNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onNodeSelect: state.onNodeSelect,
});

export function useAutomationEditor(initData: Automation) {
  const {
    nodes,
    edges,
    selectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeSelect,
  } = useStore(useShallow(selector));

  const { setCenter } = useReactFlow();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const centerNode = (node: EditorNode) => {
    if (!reactFlowWrapper.current) {
      return;
    }

    // Get node dimensions from the DOM element
    const nodeElement = document.querySelector(`[data-id="${node.id}"]`);
    const rect = nodeElement?.getBoundingClientRect();

    // Get the viewport dimensions and calculate the container width
    // Get the container width from the wrapper ref
    const containerWidth =
      reactFlowWrapper.current.getBoundingClientRect().width;

    // Calculate the offset to shift the node to 2/3 of the viewport
    const offsetX = containerWidth / 6; // (1/2 - 1/3 = 1/6) of viewport width

    // Calculate center position by adding half the node's dimensions
    const centerX = node.position.x + (rect?.width ?? 0) / 2;
    const centerY = node.position.y + (rect?.height ?? 0) / 2;

    // Apply the offset to position at 2/3
    setCenter(centerX + offsetX, centerY, { duration: 150, zoom: 1 });
  };

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
