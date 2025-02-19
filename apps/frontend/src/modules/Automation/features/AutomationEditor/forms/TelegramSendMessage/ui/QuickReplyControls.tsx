import { IconTrash } from '@tabler/icons-react';

import { ActionIcon } from '@mantine/core';

import { Tooltip } from '@mantine/core';

import { Grid } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { PropsWithChildren } from 'react';

export function QuickReplyControls({
  children,
  onDeleteClick,
  onPreferencesClick,
}: PropsWithChildren<{
  onDeleteClick: () => void;
  onPreferencesClick: () => void;
}>) {
  return (
    <Grid gutter="xs" align="center">
      <Grid.Col span="auto">{children}</Grid.Col>
      <Grid.Col span="content">
        <Tooltip label="Edit preferences" withArrow>
          <ActionIcon
            aria-label="Edit"
            variant="light"
            color="gray"
            size="lg"
            radius="md"
            onClick={() => onPreferencesClick()}
          >
            <IconAdjustments size={18} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Grid.Col>
      <Grid.Col span="content">
        <Tooltip label="Delete button" withArrow>
          <ActionIcon
            aria-label="Delete"
            variant="light"
            color="red"
            size="lg"
            radius="md"
            onClick={() => onDeleteClick()}
          >
            <IconTrash size={18} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Grid.Col>
    </Grid>
  );
}
