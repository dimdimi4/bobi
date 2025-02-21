import { PropsWithChildren } from 'react';
import { Stack, Paper, Text, Group } from '@mantine/core';

import classes from './TaskSection.module.css';

interface TaskSectionProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function TaskSection({
  title,
  description,
  actions,
  children,
}: PropsWithChildren<TaskSectionProps>) {
  return (
    <Paper p="sm" withBorder className={classes.root}>
      <Stack gap="xs">
        <Group justify="space-between">
          <Text size="md" fw={500}>
            {title}
            {description && (
              <>
                <br />
                <Text size="sm" c="dimmed" component="span">
                  {description}
                </Text>
              </>
            )}
          </Text>
          {actions && actions}
        </Group>
        {children}
      </Stack>
    </Paper>
  );
}
