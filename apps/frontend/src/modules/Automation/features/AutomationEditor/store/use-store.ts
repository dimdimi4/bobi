import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Edge,
} from '@xyflow/react';

import { AppNode, type AppState } from './types';

const initialNodes = [
  {
    id: '1',
    type: 'start',
    data: { label: '/start' },
    position: { x: 0, y: 100 },
  },
  {
    id: '2',
    type: 'condition',
    data: { label: 'Is user admin?' },
    position: { x: 400, y: 100 },
  },
  {
    id: '3',
    type: 'message',
    data: { label: 'Show admin panel' },
    position: { x: 800, y: 0 },
  },
  {
    id: '4',
    type: 'action',
    data: { label: 'Show user panel' },
    position: { x: 800, y: 200 },
  },
  {
    id: '5',
    type: 'message2',
    data: { label: 'Done' },
    position: { x: 1200, y: 100 },
  },
] as AppNode[];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    style: { strokeWidth: 2 },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    sourceHandle: 'then',
    style: { strokeWidth: 2 },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    sourceHandle: 'otherwise',
    style: { strokeWidth: 2 },
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    style: { strokeWidth: 2 },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    style: { strokeWidth: 2 },
  },
] as Edge[];

export const useStore = create<AppState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNode: null,
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    // console.log('changes', changes);
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
