import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Edge,
} from '@xyflow/react';

import {
  AutomationConnection,
  AutomationStep,
  AutomationTask,
} from '@/data/sources/api';

import { EditorNode, EditorState } from './types';

function taskToType(task: AutomationTask): string {
  if (task.trigger_receivedMessage) {
    return 'trigger';
  }

  return 'action';
}

function mapStepsToNodes(steps: AutomationStep[]): EditorNode[] {
  return steps.map((step) => {
    return {
      id: step.id,
      type: taskToType(step.task),
      data: { ...step.task },
      position: step.position,
    };
  });
}

function mapConnectionsToEdges(connections: AutomationConnection[]): Edge[] {
  return connections.map((connection) => {
    return {
      id: connection.id,
      source: connection.sourceStepId,
      target: connection.targetStepId,
      targetHandle: connection.targetHandleId,
      sourceHandle: connection.sourceHandleId,
    };
  });
}

export type EditorStore = ReturnType<typeof createStore>;

export function createStore(
  steps: AutomationStep[],
  connections: AutomationConnection[]
) {
  const nodes = mapStepsToNodes(steps);
  const edges = mapConnectionsToEdges(connections);

  return create<EditorState>((set, get) => ({
    nodes: nodes,
    edges,
    selectedNode: null,
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge(connection, get().edges),
      });
    },
    onNodeSelect: (node) => {
      set({
        selectedNode: node,
      });
    },
    setNodes: (nodes) => {
      set({ nodes });
    },
    setEdges: (edges) => {
      set({ edges });
    },
  }));
}
