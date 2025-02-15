import { Edge } from '@xyflow/react';
import { useCallback } from 'react';

import { useDeleteConnectionsMutation } from '@/data/repositories/automations-repository';

import { useEditorStore } from '../store';

export function useDeleteConnections() {
  const { automationId } = useEditorStore((s) => s);
  const { mutate: deleteConnections } =
    useDeleteConnectionsMutation(automationId);

  const handleDeleteConnections = useCallback(
    (edges: Edge[]) => {
      deleteConnections(edges.map((e) => e.id));
    },
    [deleteConnections]
  );

  return { handleDeleteConnections };
}
