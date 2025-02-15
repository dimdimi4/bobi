import { PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';

import '@xyflow/react/dist/style.css';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dropzone/styles.css';

import { theme } from './theme';

export function ThemeProvider({ children }: PropsWithChildren) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
