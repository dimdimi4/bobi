import { Badge, Button, Group, Loader, Text } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';
import { formatRelative } from 'date-fns';
import { enGB } from 'date-fns/locale';

import {
  AutomationDtoStatusEnum,
  AutomationDtoVersionTypeEnum,
} from '@/data/sources/api';

import { useCreateStep } from './hooks/use-create-step';
import { useEditorHeader } from './hooks/use-editor-header';
import { modals } from '@mantine/modals';

export function AutomationEditorHeader({ onExit }: { onExit: () => void }) {
  const { handleCreateMessageStep } = useCreateStep();
  const { automation } = useEditorHeader();

  if (!automation) {
    return <Loader />;
  }

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
        {automation.versionType === AutomationDtoVersionTypeEnum.Draft && (
          <Badge variant="filled" color="gray" size="md">
            Draft
          </Badge>
        )}
      </Group>
      <Button variant="default" size="xs" onClick={handleCreateMessageStep}>
        Add message step
      </Button>
      <AutomationEditorHeaderActions />
    </Group>
  );
}

function AutomationEditorHeaderActions() {
  const {
    automation,
    isActivatePending,
    isDeactivatePending,
    isDiscardChangesPending,
    isPublishChangesPending,
    activate,
    deactivate,
    discardChanges,
    publishChanges,
  } = useEditorHeader();

  if (
    automation.versionType === AutomationDtoVersionTypeEnum.Draft &&
    automation.hasPublishedVersion
  ) {
    return (
      <Group justify="flex-end" gap="xs">
        <Text size="xs" c="gray">
          Last changed{' '}
          {formatRelative(new Date(automation.updatedAt), new Date(), {
            locale: enGB,
          })}
        </Text>
        <Button
          variant="default"
          size="xs"
          onClick={() => discardChanges()}
          loading={isDiscardChangesPending}
          disabled={isPublishChangesPending}
        >
          Discard Changes
        </Button>
        <Button
          variant="filled"
          size="xs"
          onClick={() => publishChanges()}
          loading={isPublishChangesPending}
          disabled={isDiscardChangesPending}
        >
          Apply Changes
        </Button>
      </Group>
    );
  }

  if (automation.status === AutomationDtoStatusEnum.Inactive) {
    const openConfirmModal = () =>
      modals.openConfirmModal({
        title: 'Activate Automation',
        children: (
          <Text size="sm">
            Are you sure you want to activate this automation?
          </Text>
        ),
        labels: { confirm: 'Activate', cancel: 'Cancel' },
        onConfirm: () => activate(),
      });

    return (
      <Button
        variant="filled"
        color="teal"
        size="xs"
        onClick={openConfirmModal}
        loading={isActivatePending}
      >
        Activate Automation
      </Button>
    );
  }

  if (automation.status === AutomationDtoStatusEnum.Active) {
    return (
      <Button
        variant="filled"
        color="red"
        size="xs"
        onClick={() => deactivate()}
        loading={isDeactivatePending}
      >
        Deactivate Automation
      </Button>
    );
  }

  if (automation.status === AutomationDtoStatusEnum.Inactive) {
    return (
      <Button
        variant="filled"
        color="teal"
        size="xs"
        onClick={() => activate()}
        loading={isActivatePending}
      >
        Activate Automation
      </Button>
    );
  }

  return <></>;
}
