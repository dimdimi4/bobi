import { TriggerReceivedMessageTask } from '@/data/sources/api';
import { Stack, Text } from '@mantine/core';

export function TriggerReceivedMessageNode({
  trigger,
}: {
  trigger: TriggerReceivedMessageTask;
}) {
  return (
    <Stack gap={2}>
      {trigger.condition === 'any' && (
        <Text size="lg" fw={700}>
          any message received
        </Text>
      )}
      {trigger.condition === 'exact' && (
        <Text size="lg" fw={700}>
          exact message received:
        </Text>
      )}
      {trigger.condition === 'contains' && (
        <Text size="lg" fw={700}>
          received message contains:
        </Text>
      )}
      {trigger.templates &&
        trigger.templates?.map((template) => (
          <code key={template}>{template}</code>
        ))}
    </Stack>
  );
}
