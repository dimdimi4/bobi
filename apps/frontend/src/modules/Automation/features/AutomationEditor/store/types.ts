import {
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from '@xyflow/react';

export type EditorNode = Node;

export type EditorState = {
  nodes: EditorNode[];
  edges: Edge[];
  selectedNode: EditorNode | null;
  onNodesChange: OnNodesChange<EditorNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onNodeSelect: (node?: EditorNode) => void;
  setNodes: (nodes: EditorNode[]) => void;
  setEdges: (edges: Edge[]) => void;
};
