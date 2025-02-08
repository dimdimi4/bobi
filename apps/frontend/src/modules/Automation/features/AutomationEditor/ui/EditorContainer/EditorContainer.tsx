import { forwardRef, PropsWithChildren } from 'react';
import styles from './EditorContainer.module.css';
import { Panel } from '@xyflow/react';

export function EditorContainer({ children }: PropsWithChildren) {
  return <div className={styles.root}>{children}</div>;
}

function Header({ children }: PropsWithChildren) {
  return <Panel className={styles.header}>{children}</Panel>;
}

function SidePanel({
  children,
  opened = false,
}: PropsWithChildren<{ opened?: boolean }>) {
  const classes = [styles['side-panel']];
  if (opened) {
    classes.push(styles['side-panel--open']);
  }

  return (
    <Panel position="bottom-right" className={classes.join(' ')}>
      {children}
    </Panel>
  );
}

const Body = forwardRef<HTMLDivElement, PropsWithChildren>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className={styles.body}>
        {children}
      </div>
    );
  }
);

function Footer({ children }: PropsWithChildren) {
  return <div className={styles.footer}>{children}</div>;
}

EditorContainer.Header = Header;
EditorContainer.Body = Body;
EditorContainer.Footer = Footer;
EditorContainer.SidePanel = SidePanel;
