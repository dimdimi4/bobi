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

import { EditorNode, EditorState, EditorNodeTypes } from '../types';

function taskToType(task: AutomationTask): EditorNodeTypes {
  if (task.trigger_receivedMessage) {
    return 'trigger';
  }

  if (task.action_telegram_sendMessage) {
    return 'message';
  }

  return 'action';
}

function mapStepsToNodes(steps: AutomationStep[]): EditorNode[] {
  return steps.map((step) => {
    const type = taskToType(step.task);
    return {
      id: step.id,
      type: type,
      data: { ...step.task },
      position: step.position,
      deletable: type !== 'trigger',
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
  automationId: string,
  initSteps?: AutomationStep[],
  initConnections?: AutomationConnection[]
) {
  const steps = initSteps ? mapStepsToNodes(initSteps) : [];
  const connections = initConnections
    ? mapConnectionsToEdges(initConnections)
    : [];

  return create<EditorState>((set, get) => ({
    automationId,
    nodes: steps,
    edges: connections,
    selectedNode: null,
    updatingSteps: false,
    setSelectedNode: (node) => {
      set({
        selectedNode: node,
      });
    },
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
    setNodes: (nodes) => {
      set({ nodes });
    },
    setEdges: (edges) => {
      set({ edges });
    },
    setUpdatingSteps: (updating) => {
      set({ updatingSteps: updating });
    },
  }));
}
