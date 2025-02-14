import { useCallback, useRef } from 'react';

import { EditorNode, useEditorStore } from '../store';
import { useCenterNode } from './use-center-node';
import {
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
  OnConnectStartParams,
} from '@xyflow/react';

export function useAutomationEditor() {
  const nodes = useEditorStore((s) => s.nodes);
  const edges = useEditorStore((s) => s.edges);
  const selectedNode = useEditorStore((s) => s.selectedNode);
  const setSelectedNode = useEditorStore((s) => s.setSelectedNode);
  const onNodesChange = useEditorStore((s) => s.onNodesChange);
  const onEdgesChange = useEditorStore((s) => s.onEdgesChange);
  const onConnect = useEditorStore((s) => s.onConnect);
  const setNodes = useEditorStore((s) => s.setNodes);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const { centerNode } = useCenterNode({ reactFlowWrapper });

  const handleNodeChanges = (changes: NodeChange<EditorNode>[]) => {
    onNodesChange(changes);
  };

  const handleEdgeChanges = (changes: EdgeChange<Edge>[]) => {
    onEdgesChange(changes);
  };

  const handleNodeSelect = useCallback(
    (node: EditorNode) => {
      if (selectedNode?.id === node.id) {
        setSelectedNode(undefined);
      } else {
        setSelectedNode(node);
        centerNode(node);
      }
    },
    [centerNode, setSelectedNode, selectedNode?.id]
  );

  const handlePaneClick = useCallback(() => {
    setSelectedNode(undefined);
  }, [setSelectedNode]);

  const handleConnect = useCallback(
    (params: Connection) => {
      onConnect(params);
    },
    [onConnect]
  );

  const addMessageStep = () => {
    setNodes([
      ...nodes,
      {
        id: '1',
        type: 'action',
        data: {
          label: 'Message',
        },
        position: { x: 0, y: 0 },
      },
    ]);
  };

  return {
    reactFlowWrapper,
    nodes,
    edges,
    selectedNode,
    handleNodeSelect,
    handlePaneClick,
    handleEdgeChanges,
    handleConnect,
    addMessageStep,
    handleNodeChanges,
  };
}
