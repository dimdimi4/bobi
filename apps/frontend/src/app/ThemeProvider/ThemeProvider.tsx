import { PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@xyflow/react/dist/style.css';

import { theme } from './theme';

export function ThemeProvider({ children }: PropsWithChildren) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
