import { useCallback } from 'react';

import { useDeleteStepsMutation } from '@/data/repositories/automations-repository';

import { EditorNode, useEditorStore } from '../store';

export function useDeleteSteps() {
  const automation = useEditorStore((s) => s.automation);
  const { mutate: deleteSteps } = useDeleteStepsMutation(automation.id);

  const handleDeleteSteps = useCallback(
    (nodes: EditorNode[]) => {
      deleteSteps(nodes.map((n) => n.id));
    },
    [deleteSteps]
  );

  return { handleDeleteSteps };
}
