import { PropsWithChildren } from 'react';
import { Stack, Paper, Text } from '@mantine/core';

import classes from './TaskSection.module.css';

interface TaskSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function TaskSection({
  title,
  description,
  children,
}: PropsWithChildren<TaskSectionProps>) {
  return (
    <Paper p="sm" withBorder className={classes.root}>
      <Stack gap="xs">
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
        {children}
      </Stack>
    </Paper>
  );
}
