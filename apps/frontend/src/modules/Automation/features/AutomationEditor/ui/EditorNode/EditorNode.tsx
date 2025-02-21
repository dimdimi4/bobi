import { PropsWithChildren } from 'react';

import styles from './EditorNode.module.css';
import { Handle } from '@xyflow/react';
import { HandleProps } from '@xyflow/react';
import { Group } from '@mantine/core';

function EditorNode({ children }: PropsWithChildren) {
  return <div className={styles.root}>{children}</div>;
}

function Body({ children }: PropsWithChildren) {
  return <div className={styles.body}>{children}</div>;
}

function Section({ children }: PropsWithChildren) {
  return <div className={styles.section}>{children}</div>;
}

function HandleContainer({
  children,
  padded = false,
  justify = 'flex-start',
}: PropsWithChildren<{
  padded?: { x?: boolean; y?: boolean } | boolean;
  justify?: 'flex-start' | 'flex-end' | 'space-between';
}>) {
  const classes = [styles.handleContainer];

  if (padded) {
    if (typeof padded === 'boolean') {
      classes.push(styles.padded);
    } else {
      if (padded.x) {
        classes.push(styles.paddedX);
      }
      if (padded.y) {
        classes.push(styles.paddedY);
      }
    }
  }

  return (
    <Group className={classes.join(' ')} justify={justify}>
      {children}
    </Group>
  );
}

function InputHandle(props: Omit<HandleProps, 'type'>) {
  return (
    <Handle id="input" {...props} type="target" className={styles.handle} />
  );
}

function OutputHandle(props: Omit<HandleProps, 'type'>) {
  return (
    <Handle id="output" {...props} type="source" className={styles.handle} />
  );
}

EditorNode.Body = Body;
EditorNode.HandleContainer = HandleContainer;
EditorNode.InputHandle = InputHandle;
EditorNode.OutputHandle = OutputHandle;
EditorNode.Section = Section;
export { EditorNode };
