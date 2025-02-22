import { v7 as uuid } from 'uuid';

import { useCreateStepMutation } from '@/data/repositories/automations-repository';

import { EditorNode, useEditorStore } from '../store';

export function useCreateStep() {
  const { automation, nodes, setNodes } = useEditorStore((s) => s);
  const { mutate: createStep } = useCreateStepMutation(automation.id);

  const handleAddStep = (step: EditorNode) => {
    setNodes([...nodes, step]);
    createStep({
      step: {
        id: step.id,
        task: step.data,
        position: step.position,
      },
    });
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
