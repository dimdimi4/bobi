import { PropsWithChildren } from 'react';
import styles from './EditorContainer.module.css';

export function EditorContainer({ children }: PropsWithChildren) {
  return <div className={styles.root}>{children}</div>;
}

function Header({ children }: PropsWithChildren) {
  return <div className={styles.header}>{children}</div>;
}

function Body({ children }: PropsWithChildren) {
  return <div className={styles.body}>{children}</div>;
}

function Footer({ children }: PropsWithChildren) {
  return <div className={styles.footer}>{children}</div>;
}

EditorContainer.Header = Header;
EditorContainer.Body = Body;
EditorContainer.Footer = Footer;
