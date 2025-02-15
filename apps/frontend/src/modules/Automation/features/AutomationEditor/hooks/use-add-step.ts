import { v7 as uuid } from 'uuid';

import { useCreateStepMutation } from '@/data/repositories/automations-repository';

import { EditorNode, useEditorStore } from '../store';

export function useAddStep() {
  const { automationId, nodes, setNodes } = useEditorStore((s) => s);
  const { mutate: createStep } = useCreateStepMutation(automationId);

  const addStep = (step: EditorNode) => {
    setNodes([...nodes, step]);
    createStep({
      step: {
        id: step.id,
        task: step.data,
        position: step.position,
      },
    });
  };

  const addMessageStep = () => {
    addStep({
      id: uuid(),
      type: 'message',
      position: { x: 0, y: 0 },
      data: {
        action_telegram_sendMessage: {
          message: 'Hello, world!',
          quickReplies: [],
        },
      },
    });
  };

  return { addStep, addMessageStep };
}
