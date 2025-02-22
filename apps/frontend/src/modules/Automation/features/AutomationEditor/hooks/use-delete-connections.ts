import { Edge } from '@xyflow/react';
import { useCallback } from 'react';

import { useDeleteConnectionsMutation } from '@/data/repositories/automations-repository';

import { useEditorStore } from '../store';

export function useDeleteConnections() {
  const automation = useEditorStore((s) => s.automation);
  const { mutate: deleteConnections } = useDeleteConnectionsMutation(
    automation.id
  );

  const handleDeleteConnections = useCallback(
    (edges: Edge[]) => {
      deleteConnections(edges.map((e) => e.id));
    },
    [deleteConnections]
  );

  return { handleDeleteConnections };
}
