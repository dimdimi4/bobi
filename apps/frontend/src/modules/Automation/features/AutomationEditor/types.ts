import { AutomationStep, AutomationDto } from '@/data/sources/api';

import {
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from '@xyflow/react';

export type EditorNodeTypes = 'trigger' | 'action' | 'condition' | 'message';

export type EditorNode = Node<
  AutomationStep['task'] & Record<string, unknown>,
  EditorNodeTypes
>;

export type EditorState = {
  automationId: string;
  nodes: EditorNode[];
  edges: Edge[];
  selectedNode: EditorNode | null;
  setSelectedNode: (node?: EditorNode) => void;
  onNodesChange: OnNodesChange<EditorNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: EditorNode[]) => void;
  setEdges: (edges: Edge[]) => void;
};

export type AutomationEditorProps = {
  automation: AutomationDto;
  onExit: () => void;
};
