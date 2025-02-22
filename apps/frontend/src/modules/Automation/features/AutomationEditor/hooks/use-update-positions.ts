import { useUpdateStepPositionsMutation } from '@/data/repositories/automations-repository';

import { EditorNode, useEditorStore } from '../store';
import { useCallback } from 'react';

export function useUpdateStepPositions() {
  const automationId = useEditorStore((s) => s.automationId);
  const { mutate: updateStepPositions } =
    useUpdateStepPositionsMutation(automationId);

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
