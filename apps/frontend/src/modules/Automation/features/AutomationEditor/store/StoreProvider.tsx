// Provider wrapper
import { useRef } from 'react';

import { AutomationConnection, AutomationStep } from '@/data/sources/api';

import { createStore, EditorStore } from './store';
import { EditorStoreContext } from './context';

type StoreProviderProps = React.PropsWithChildren<{
  steps: AutomationStep[];
  connections: AutomationConnection[];
}>;

export function StoreProvider({
  children,
  steps,
  connections,
}: StoreProviderProps) {
  const storeRef = useRef<EditorStore>();
  if (!storeRef.current) {
    storeRef.current = createStore(steps, connections);
  }

  return (
    <EditorStoreContext.Provider value={storeRef.current}>
      {children}
    </EditorStoreContext.Provider>
  );
}
