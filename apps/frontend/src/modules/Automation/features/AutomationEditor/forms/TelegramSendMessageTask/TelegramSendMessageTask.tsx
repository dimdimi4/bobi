import {
  Button,
  CloseButton,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useForm } from '@tanstack/react-form';

import { TextEditor } from '../../ui/TextEditor';
import { TelegramSendMessageTask } from '@/data/sources/api';
import { IconCircleDashedPlus } from '@tabler/icons-react';
import { Media } from './Media';

export function TelegramSendMessageTaskForm({
  task,
}: {
  task: TelegramSendMessageTask;
}) {
  const form = useForm<TelegramSendMessageTask>({
    defaultValues: task,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={3}>Send message</Title>
          <CloseButton size="lg" />
        </Group>
        <Media />
        <Paper p="sm" withBorder shadow="xs">
          <Stack gap="xs">
            <Text size="md" fw={500}>
              Text <br />
              <Text size="sm" c="dimmed" component="span">
                Text message that will be sent to the user
              </Text>
            </Text>
            <form.Field
              name="message"
              children={({ state, handleChange }) => (
                <TextEditor
                  value={state.value}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                />
              )}
            />
          </Stack>
        </Paper>
        <Paper p="sm" withBorder shadow="xs">
          <Stack gap="xs">
            <Text size="lg" fw={500}>
              Quick replies
              <br />
              <Text size="sm" c="dimmed" component="span">
                Quick replies buttons will help the user to interact with the
                message.
              </Text>
            </Text>
            <Button
              leftSection={<IconCircleDashedPlus size={24} strokeWidth={1} />}
              variant="default"
              fullWidth
            >
              Add quick reply button
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </form>
  );
}
