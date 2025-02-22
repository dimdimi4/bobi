import { v7 as uuid } from 'uuid';

import { useCreateStepMutation } from '@/data/repositories/automations-repository';

import { EditorNode, useEditorStore } from '../store';

export function useCreateStep() {
  const automationId = useEditorStore((s) => s.automationId);
  const { nodes, setNodes } = useEditorStore((s) => s);
  const setUpdatingSteps = useEditorStore((s) => s.setUpdatingSteps);
  const { mutate: createStep } = useCreateStepMutation(automationId);

  const handleAddStep = (step: EditorNode) => {
    setNodes([...nodes, step]);
    setUpdatingSteps(true);
    createStep(
      {
        step: {
          id: step.id,
          task: step.data,
          position: step.position,
        },
      },
      {
        onSettled: () => setUpdatingSteps(false),
      }
    );
  };

  const handleCreateMessageStep = () => {
    handleAddStep({
      id: uuid(),
      type: 'message',
      position: { x: 0, y: 0 },
      data: {
        action_telegram_sendMessage: {
          message: 'Hello, world!',
          quickReplyButtons: [
            {
              id: uuid(),
              text: 'Hello',
              url: 'https://google.com',
            },
          ],
        },
      },
    });
  };

  return { handleAddStep, handleCreateMessageStep };
}
