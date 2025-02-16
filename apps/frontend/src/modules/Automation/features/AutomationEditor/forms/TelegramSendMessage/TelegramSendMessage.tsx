import { v7 as uuidv7 } from 'uuid';
import {
  ActionIcon,
  Button,
  CloseButton,
  Grid,
  Group,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';

import { TextEditor } from '../../ui/TextEditor';
import { TelegramSendMessageTask } from '@/data/sources/api';
import {
  IconCircleDashedPlus,
  IconExternalLink,
  IconMinus,
} from '@tabler/icons-react';
import { useTelegramSendMessage } from './hooks/use-telegram-send-message';
import { TaskSection } from '../../ui/TaskSection';
// import { Media } from './Media';

export function TelegramSendMessage({
  task,
}: {
  task: TelegramSendMessageTask;
}) {
  const { form } = useTelegramSendMessage({ task });

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
        {/* <Media /> */}

        <form.Field
          name="message"
          children={({ state, handleChange }) => (
            <TaskSection
              title="Message"
              description="Message that will be sent to the user"
            >
              <TextEditor
                value={state.value}
                onChange={handleChange}
                placeholder="Type your message here..."
              />
            </TaskSection>
          )}
        />

        <form.Field
          name="quickReplyButtons"
          children={({ state, handleChange }) => (
            <TaskSection
              title="Quick replies"
              description="Quick replies buttons will help the user to interact with the message"
            >
              {state.value.map((_, i) => {
                return (
                  <form.Field key={i} name={`quickReplyButtons[${i}].text`}>
                    {(subField) => (
                      <Grid gutter="xs" align="center">
                        <Grid.Col span="content">
                          <IconExternalLink size={24} />
                        </Grid.Col>
                        <Grid.Col span="content">
                          <IconExternalLink size={24} />
                        </Grid.Col>
                        <Grid.Col span="auto">
                          <TextInput
                            value={subField.state.value}
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                            styles={{ input: { textAlign: 'center' } }}
                            placeholder="Type your quick reply here..."
                          />
                        </Grid.Col>
                        <Grid.Col span="content">
                          <ActionIcon
                            aria-label="Delete"
                            variant="filled"
                            color="red"
                            size="sm"
                            radius="xl"
                            onClick={() =>
                              handleChange((prev) => [
                                ...prev.filter((_, index) => index !== i),
                              ])
                            }
                          >
                            <IconMinus size={24} stroke={2} />
                          </ActionIcon>
                        </Grid.Col>
                      </Grid>
                    )}
                  </form.Field>
                );
              })}
              <Button
                leftSection={<IconCircleDashedPlus size={24} strokeWidth={1} />}
                variant="default"
                fullWidth
                onClick={() =>
                  handleChange((prev) => [...prev, { id: uuidv7(), text: '' }])
                }
              >
                Add quick reply button
              </Button>
            </TaskSection>
          )}
        />
      </Stack>
    </form>
  );
}
