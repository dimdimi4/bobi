import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Edge,
  MarkerType,
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
      style: { stroke: 'var(--mantine-primary-color-9)', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        strokeWidth: 2,
        color: 'var(--mantine-primary-color-9)',
        width: 8,
        height: 8,
      },
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
