import { useCallback } from 'react';

import { useDeleteStepsMutation } from '@/data/repositories/automations-repository';

import { EditorNode, useEditorStore } from '../store';

export function useDeleteSteps() {
  const automationId = useEditorStore((s) => s.automationId);
  const setUpdatingSteps = useEditorStore((s) => s.setUpdatingSteps);
  const { mutate: deleteSteps } = useDeleteStepsMutation(automationId);

  const handleDeleteSteps = useCallback(
    (nodes: EditorNode[]) => {
      setUpdatingSteps(true);
      deleteSteps(
        nodes.map((n) => n.id),
        {
          onSettled: () => setUpdatingSteps(false),
        }
      );
    },
    [deleteSteps, setUpdatingSteps]
  );

  return { handleDeleteSteps };
}
