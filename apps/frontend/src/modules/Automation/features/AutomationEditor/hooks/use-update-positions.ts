import { useUpdateStepPositionsMutation } from '@/data/repositories/automations-repository';

import { EditorNode, useEditorStore } from '../store';
import { useCallback } from 'react';

export function useUpdateStepPositions() {
  const automation = useEditorStore((s) => s.automation);
  const { mutate: updateStepPositions } = useUpdateStepPositionsMutation(
    automation.id
  );

  const handleStepPositionChange = useCallback(
    (steps: EditorNode[]) => {
      updateStepPositions({
        steps: steps.map((step) => ({
          stepId: step.id,
          position: step.position,
        })),
      });
    },
    [updateStepPositions]
  );

  return { handleStepPositionChange };
}
