import { forwardRef, PropsWithChildren } from 'react';
import styles from './EditorContainer.module.css';

export function EditorContainer({ children }: PropsWithChildren) {
  return <div className={styles.root}>{children}</div>;
}

function Header({ children }: PropsWithChildren) {
  return <div className={styles.header}>{children}</div>;
}

function Content({ children }: PropsWithChildren) {
  return <div className={styles.content}>{children}</div>;
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
    <div className={classes.join(' ')}>
      <div className={styles['side-panel__content']}>{children}</div>
    </div>
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
EditorContainer.Content = Content;
EditorContainer.Footer = Footer;
EditorContainer.SidePanel = SidePanel;
