import { useCallback } from 'react';
import { useUpdateStepPositionsMutation } from '@/data/repositories/automations-repository';

import { EditorNode, useEditorStore } from '../store';

export function useUpdateStepPositions() {
  const automationId = useEditorStore((s) => s.automationId);
  const setUpdatingSteps = useEditorStore((s) => s.setUpdatingSteps);
  const { mutate: updateStepPositions } =
    useUpdateStepPositionsMutation(automationId);

  const handleStepPositionChange = useCallback(
    (steps: EditorNode[]) => {
      setUpdatingSteps(true);
      updateStepPositions(
        {
          steps: steps.map((step) => ({
            stepId: step.id,
            position: step.position,
          })),
        },
        {
          onSettled: () => setUpdatingSteps(false),
        }
      );
    },
    [updateStepPositions, setUpdatingSteps]
  );

  return { handleStepPositionChange };
}
