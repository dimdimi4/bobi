import { Group, Loader, Text } from '@mantine/core';
import { Badge, Button } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';

import {
  AutomationDtoStatusEnum,
  AutomationDtoVersionTypeEnum,
} from '@/data/sources/api';

import { useCreateStep } from './hooks/use-create-step';
import { useEditorHeader } from './hooks/use-editor-header';

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
          Last changed on {new Date(automation.updatedAt).toLocaleDateString()}
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
