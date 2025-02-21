import { v7 as uuidv7 } from 'uuid';
import { UseFormReturnType } from '@mantine/form';
import {
  Button,
  Group,
  Modal,
  Space,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { IconCircleDashedPlus, IconExternalLink } from '@tabler/icons-react';

import { TelegramSendMessageTask } from '@/data/sources/api';

import { TaskSection } from '../../ui/TaskSection';
import { useState } from 'react';
import { QuickReplyControls } from './ui/QuickReplyControls';
import { modals } from '@mantine/modals';

export function QuickRepliesSection({
  form,
}: {
  form: UseFormReturnType<TelegramSendMessageTask>;
}) {
  return (
    <TaskSection
      title="Quick replies"
      description="Buttons will help the user to interact with the message"
    >
      {form.getValues().quickReplyButtons.map((item, index) => (
        <QuickReplyItem
          key={item.id}
          form={form}
          index={index}
          onDeleteClick={() => form.removeListItem('quickReplyButtons', index)}
        />
      ))}
      <Button
        leftSection={<IconCircleDashedPlus size={24} strokeWidth={1} />}
        variant="default"
        fullWidth
        onClick={() =>
          form.insertListItem('quickReplyButtons', { id: uuidv7(), text: '' })
        }
      >
        Add quick reply button
      </Button>
    </TaskSection>
  );
}

function QuickReplyItem({
  index,
  form,
  onDeleteClick,
}: {
  index: number;
  form: UseFormReturnType<TelegramSendMessageTask>;
  onDeleteClick: () => void;
}) {
  const [openedPreferences, setOpenedPreferences] = useState(false);
  const url = form.getValues().quickReplyButtons[index].url;
  const text = form.getValues().quickReplyButtons[index].text;

  const openModal = () =>
    modals.openConfirmModal({
      title: 'Delete quick reply button',
      children: (
        <Text size="sm">
          Are you sure you want to delete this quick reply button?
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      onConfirm: onDeleteClick,
    });

  const leftSection = url ? (
    <Tooltip label={url} withArrow>
      <IconExternalLink size={18} stroke={1.5} />
    </Tooltip>
  ) : (
    <Space w="md" />
  );

  return (
    <>
      <QuickReplyControls
        onDeleteClick={text ? openModal : onDeleteClick}
        onPreferencesClick={() => setOpenedPreferences(true)}
      >
        <TextInput
          leftSection={leftSection}
          key={form.key(`quickReplyButtons.${index}.text`)}
          {...form.getInputProps(`quickReplyButtons.${index}.text`)}
          styles={{ input: { textAlign: 'center' } }}
          placeholder="Type quick reply here..."
        />
      </QuickReplyControls>
      <Modal
        opened={openedPreferences}
        onClose={() => setOpenedPreferences(false)}
        title="Button preferences"
      >
        <Stack gap="xs">
          <TextInput
            label="URL"
            type="url"
            placeholder="https://example.com"
            description="Make this button open the given URL when clicked"
            key={form.key(`quickReplyButtons.${index}.url`)}
            {...form.getInputProps(`quickReplyButtons.${index}.url`)}
          />
          <Group justify="flex-end">
            <Button
              variant="filled"
              onClick={() => setOpenedPreferences(false)}
            >
              Done
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
