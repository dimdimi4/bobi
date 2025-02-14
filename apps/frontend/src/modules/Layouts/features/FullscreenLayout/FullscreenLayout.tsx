import { PropsWithChildren } from 'react';
import { AppShell } from '@mantine/core';

export function FullscreenLayout({ children }: PropsWithChildren) {
  return (
    <AppShell withBorder={false}>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
