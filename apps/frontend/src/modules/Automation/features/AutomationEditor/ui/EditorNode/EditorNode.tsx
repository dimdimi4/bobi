import { PropsWithChildren } from 'react';
import { Card, Group, Text } from '@mantine/core';
import { Handle, Position } from '@xyflow/react';

import styles from './EditorNode.module.css';

type EditorNodeProps = {
  start?: boolean;
  end?: boolean;
};

function EditorNode({
  children,
  start = false,
  end = false,
}: PropsWithChildren<EditorNodeProps>) {
  const classes = [styles.EditorNode];

  if (start) {
    classes.push(styles.EditorNodeStart);
  }

  if (end) {
    classes.push(styles.EditorNodeEnd);
  }

  return (
    <Card shadow="xs" withBorder className={classes.join(' ')}>
      {children}
    </Card>
  );
}

function BodyContainer({ children }: PropsWithChildren) {
  return (
    <Card.Section inheritPadding py={4} className={styles.BodyContainer}>
      <div className={styles.BodyContainerContent}>{children}</div>
    </Card.Section>
  );
}

function HandleContainer({ children }: PropsWithChildren) {
  return (
    <Card.Section inheritPadding py={6} className={styles.HandleContainer}>
      {children}
    </Card.Section>
  );
}

function HandleText({ text }: { text: string }) {
  return (
    <Text fw={600} size="sm" c="dimmed">
      {text}
    </Text>
  );
}

function StartHandle({ text = 'Start when...' }: { text: string }) {
  return (
    <HandleContainer>
      <HandleText text={text} />
    </HandleContainer>
  );
}

function InputHandle({ text = 'Start when...' }: { text: string }) {
  return (
    <HandleContainer>
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        className={styles.HandleElement}
      />
      <Group justify="flex-start">
        <HandleText text={text} />
      </Group>
    </HandleContainer>
  );
}

function OutputHandle({
  text,
  id = 'right',
  altHandle,
  children,
}: PropsWithChildren<{
  id: string;
  text?: string;
  altHandle?: boolean;
}>) {
  const classes = [styles.HandleElement];

  if (altHandle) {
    classes.push(styles.HandleElementAlternative);
  }

  return (
    <HandleContainer>
      <Handle
        id={id}
        type="source"
        position={Position.Right}
        className={classes.join(' ')}
      />
      {children}
      {text && (
        <Group justify="flex-end">
          <HandleText text={text} />
        </Group>
      )}
    </HandleContainer>
  );
}

EditorNode.StartHandle = StartHandle;
EditorNode.InputHandle = InputHandle;
EditorNode.OutputHandle = OutputHandle;
EditorNode.HandleContainer = HandleContainer;
EditorNode.HandleText = HandleText;
EditorNode.BodyContainer = BodyContainer;

export { EditorNode };
