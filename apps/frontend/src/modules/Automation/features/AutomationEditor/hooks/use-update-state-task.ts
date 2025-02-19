import { useEditorStore } from '../store';
import { useUpdateStepTaskMutation } from '@/data/repositories/automations-repository';
import { AutomationStepTask } from '../types';

export function useUpdateStateTask() {
  const { automationId, selectedNode, nodes, setNodes } = useEditorStore(
    (s) => s
  );
  const { mutate: updateStepTask } = useUpdateStepTaskMutation(
    automationId,
    selectedNode?.id ?? ''
  );

  const handleUpdateStateTask = (task: AutomationStepTask) => {
    setNodes(
      nodes.map((node) =>
        node.id === selectedNode?.id ? { ...node, data: task } : node
      )
    );
    updateStepTask(task);
  };

  return {
    handleUpdateStateTask,
  };
}
