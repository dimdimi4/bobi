import { useCallback } from 'react';
import { useUpdateStepTaskMutation } from '@/data/repositories/automations-repository';

import { useEditorStore } from '../store';
import { AutomationStepTask } from '../types';

export function useUpdateStateTask() {
  const automationId = useEditorStore((s) => s.automationId);
  const { selectedNode, nodes, setNodes } = useEditorStore((s) => s);
  const setUpdatingSteps = useEditorStore((s) => s.setUpdatingSteps);
  const { mutate: updateStepTask } = useUpdateStepTaskMutation(
    automationId,
    selectedNode?.id ?? ''
  );

  const handleUpdateStateTask = useCallback(
    (task: AutomationStepTask) => {
      setNodes(
        nodes.map((node) =>
          node.id === selectedNode?.id ? { ...node, data: task } : node
        )
      );
      setUpdatingSteps(true);
      updateStepTask(task, {
        onSettled: () => setUpdatingSteps(false),
      });
    },
    [nodes, selectedNode?.id, setNodes, updateStepTask, setUpdatingSteps]
  );

  return {
    handleUpdateStateTask,
  };
}
