import { Group } from '@mantine/core';
import { Badge, Button } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';

import { useCreateStep } from './hooks/use-create-step';

export function AutomationEditorHeader({ onExit }: { onExit: () => void }) {
  const { handleCreateMessageStep } = useCreateStep();

  return (
    <Group justify="space-between" gap="xs">
      <Group justify="flex-end" gap="xs">
        <Button
          leftSection={<IconLogout2 size={14} />}
          variant="subtle"
          color="gray"
          size="xs"
          onClick={onExit}
        >
          Exit Editor
        </Button>
        <Badge variant="filled" color="gray" size="lg">
          Draft
        </Badge>
      </Group>
      <Group justify="flex-end" gap="xs">
        <Button variant="default" size="xs" onClick={handleCreateMessageStep}>
          Add message step
        </Button>
        <Button variant="default" size="xs" onClick={onExit}>
          Discard Changes
        </Button>
        <Button variant="filled" size="xs" onClick={onExit}>
          Apply Changes
        </Button>
      </Group>
    </Group>
  );
}
