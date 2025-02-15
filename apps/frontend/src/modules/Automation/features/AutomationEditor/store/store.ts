import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Edge,
} from '@xyflow/react';

import {
  AutomationConnection,
  AutomationDto,
  AutomationStep,
  AutomationTask,
} from '@/data/sources/api';

import { EditorNode, EditorState, EditorNodeTypes } from '../types';

function taskToType(task: AutomationTask): EditorNodeTypes {
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

export function createStore(automation: AutomationDto) {
  const nodes = mapStepsToNodes(automation.steps);
  const edges = mapConnectionsToEdges(automation.connections);

  return create<EditorState>((set, get) => ({
    automationId: automation.id,
    nodes: nodes,
    edges,
    selectedNode: null,
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
  }));
}
