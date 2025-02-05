import { AppShell, createTheme } from '@mantine/core';

export const theme = createTheme({
  defaultRadius: 'md',

  components: {
    AppShell: AppShell.extend({
      styles: {
        main: {
          backgroundColor: 'var(--mantine-color-gray-0)',
        },
        navbar: {
          backgroundColor: 'var(--mantine-color-gray-1)',
        },
      },
    }),
  },
});
