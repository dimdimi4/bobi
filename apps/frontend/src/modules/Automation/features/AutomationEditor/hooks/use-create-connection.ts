import { v7 as uuid } from 'uuid';
import { useCallback } from 'react';

import { useCreateConnectionMutation } from '@/data/repositories/automations-repository';

import { useEditorStore } from '../store';
import { Connection } from '@xyflow/react';

export function useCreateConnection() {
  const { automationId, onConnect } = useEditorStore((s) => s);
  const { mutate: createConnection } =
    useCreateConnectionMutation(automationId);

  const handleCreateConnection = useCallback(
    (connection: Connection) => {
      onConnect(connection);
      createConnection({
        id: uuid(),
        sourceStepId: connection.source,
        targetStepId: connection.target,
        sourceHandleId: connection.sourceHandle ?? undefined,
        targetHandleId: connection.targetHandle ?? undefined,
      });
    },
    [onConnect, createConnection]
  );

  return { handleCreateConnection };
}
