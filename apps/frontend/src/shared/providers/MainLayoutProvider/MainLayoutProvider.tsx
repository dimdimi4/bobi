import { PropsWithChildren } from 'react';
import { MainLayoutContext } from './main-layout-context';
import { useDisclosure } from '@mantine/hooks';

export function MainLayoutProvider({ children }: PropsWithChildren) {
  const [fullscreen, { toggle: toggleFullscreen }] = useDisclosure();

  return (
    <MainLayoutContext.Provider value={{ fullscreen, toggleFullscreen }}>
      {children}
    </MainLayoutContext.Provider>
  );
}
