import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { CloseButton, Group, Space, Stack, Title } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';

import { TelegramSendMessageTask } from '@/data/sources/api';

import { QuickRepliesSection } from './QuickRepliesSection';
import { MessageSection } from './MessageSection';
import { TimeoutSection } from './TimeoutSection';

const formSchema = z.object({
  message: z
    .string({
      required_error: 'Message is required',
    })
    .min(1, { message: 'Message is required' })
    .max(4000, { message: 'Message must be less than 4000 characters' }),
  quickReplyButtons: z.array(
    z.object({
      id: z.string(),
      text: z
        .string({
          required_error: 'Text is required',
        })
        .min(1, { message: 'Text is required' }),
      url: z
        .string()
        .url({
          message: 'URL is invalid',
        })
        .optional(),
    })
  ),
  timeout: z
    .object({
      duration: z.number().min(1, { message: 'Duration is required' }),
      unit: z.string().min(1, { message: 'Unit is required' }),
    })
    .optional(),
});

export function TelegramSendMessage({
  initialValues,
  onSubmit,
}: {
  initialValues?: TelegramSendMessageTask;
  onSubmit: (value: TelegramSendMessageTask) => void;
}) {
  const handleValuesChange = useDebouncedCallback(onSubmit, 500);

  const form = useForm<TelegramSendMessageTask>({
    mode: 'uncontrolled',
    initialValues: initialValues,
    validateInputOnChange: true,
    onValuesChange: (values) => {
      if (form.isValid()) {
        handleValuesChange(values);
      }
    },
    validate: zodResolver(formSchema),
  });

  return (
    <form onSubmit={form.onSubmit(handleValuesChange)}>
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={3}>Send message</Title>
          <CloseButton size="lg" />
        </Group>
        <MessageSection form={form} />
        <QuickRepliesSection form={form} />
        <TimeoutSection form={form} />
        <Space h="xl" />
      </Stack>
    </form>
  );
}
