import { PropsWithChildren } from 'react';
import { Group, AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useMainLayoutContext } from '@/shared/providers/MainLayoutProvider';

import { Sidebar } from './Sidebar';

export function MainLayout({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();
  const { fullscreen } = useMainLayoutContext();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
      disabled={fullscreen}
      withBorder={false}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
