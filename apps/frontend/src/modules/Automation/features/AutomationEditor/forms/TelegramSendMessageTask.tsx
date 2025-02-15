import { Button, Divider, Group, Paper, Stack } from '@mantine/core';
import { useForm } from '@tanstack/react-form';

import { TextEditor } from '../ui/TextEditor';
import { TelegramSendMessageTask } from '@/data/sources/api';

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
      <Paper p="md">
        <Stack gap="xs">
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
      <Divider />
      <Paper p="md">
        <Group justify="flex-end">
          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isTouched,
            ]}
            children={([canSubmit, isSubmitting, isTouched]) => (
              <Button
                type="submit"
                disabled={!canSubmit || !isTouched}
                loading={isSubmitting}
              >
                Save step
              </Button>
            )}
          />
        </Group>
      </Paper>
    </form>
  );
}
