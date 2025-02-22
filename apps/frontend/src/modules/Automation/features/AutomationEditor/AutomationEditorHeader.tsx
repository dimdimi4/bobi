import { Group, Text } from '@mantine/core';
import { Badge, Button } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';

import { useCreateStep } from './hooks/use-create-step';
import { useEditorStore } from './store';

export function AutomationEditorHeader({ onExit }: { onExit: () => void }) {
  const { handleCreateMessageStep } = useCreateStep();
  const automation = useEditorStore((s) => s.automation);

  const isDraft = !automation.version.publishedAt;

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
        {isDraft && (
          <Badge variant="filled" color="gray" size="md">
            Draft
          </Badge>
        )}
      </Group>
      <Button variant="default" size="xs" onClick={handleCreateMessageStep}>
        Add message step
      </Button>
      {isDraft && (
        <Group justify="flex-end" gap="xs">
          <Text size="xs" c="gray">
            Last changed on{' '}
            {new Date(automation.updatedAt).toLocaleDateString()}
          </Text>
          <Button variant="default" size="xs" onClick={onExit}>
            Discard Changes
          </Button>
          <Button variant="filled" size="xs" onClick={onExit}>
            Apply Changes
          </Button>
        </Group>
      )}
    </Group>
  );
}
