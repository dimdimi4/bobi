import { v7 as uuid } from 'uuid';
import { useCallback } from 'react';

import { useCreateConnectionMutation } from '@/data/repositories/automations-repository';

import { useEditorStore } from '../store';
import { Connection } from '@xyflow/react';

export function useCreateConnection() {
  const automationId = useEditorStore((s) => s.automationId);
  const onConnect = useEditorStore((s) => s.onConnect);
  const setUpdatingSteps = useEditorStore((s) => s.setUpdatingSteps);

  const { mutate: createConnection } =
    useCreateConnectionMutation(automationId);

  const handleCreateConnection = useCallback(
    (connection: Connection) => {
      setUpdatingSteps(true);
      onConnect(connection);
      createConnection(
        {
          id: uuid(),
          sourceStepId: connection.source,
          targetStepId: connection.target,
          sourceHandleId: connection.sourceHandle ?? undefined,
          targetHandleId: connection.targetHandle ?? undefined,
        },
        {
          onSettled: () => setUpdatingSteps(false),
        }
      );
    },
    [onConnect, createConnection, setUpdatingSteps]
  );

  return { handleCreateConnection };
}
