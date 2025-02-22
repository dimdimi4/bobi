// Provider wrapper
import { useRef } from 'react';

import { AutomationConnection, AutomationStep } from '@/data/sources/api';

import { createStore, EditorStore } from './store';
import { EditorStoreContext } from './context';

type StoreProviderProps = React.PropsWithChildren<{
  automationId: string;
  initSteps?: AutomationStep[];
  initConnections?: AutomationConnection[];
}>;

export function StoreProvider({
  children,
  automationId,
  initSteps,
  initConnections,
}: StoreProviderProps) {
  const storeRef = useRef<EditorStore>();
  if (!storeRef.current) {
    storeRef.current = createStore(automationId, initSteps, initConnections);
  }

  return (
    <EditorStoreContext.Provider value={storeRef.current}>
      {children}
    </EditorStoreContext.Provider>
  );
}
