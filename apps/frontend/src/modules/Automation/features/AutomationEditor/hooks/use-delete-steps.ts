import { useCallback } from 'react';

import { useDeleteStepsMutation } from '@/data/repositories/automations-repository';

import { EditorNode, useEditorStore } from '../store';

export function useDeleteSteps() {
  const { automationId } = useEditorStore((s) => s);
  const { mutate: deleteSteps } = useDeleteStepsMutation(automationId);

  const handleDeleteSteps = useCallback(
    (nodes: EditorNode[]) => {
      deleteSteps(nodes.map((n) => n.id));
    },
    [deleteSteps]
  );

  return { handleDeleteSteps };
}
