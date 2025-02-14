// Provider wrapper
import { useRef } from 'react';

import {
  Automation,
  AutomationConnection,
  AutomationStep,
} from '@/data/sources/api';

import { createStore, EditorStore } from './store';
import { EditorStoreContext } from './context';

type StoreProviderProps = React.PropsWithChildren<{
  automation: Automation;
  steps: AutomationStep[];
  connections: AutomationConnection[];
}>;

export function StoreProvider({
  children,
  steps,
  connections,
  automation,
}: StoreProviderProps) {
  const storeRef = useRef<EditorStore>();
  if (!storeRef.current) {
    storeRef.current = createStore(automation, steps, connections);
  }

  return (
    <EditorStoreContext.Provider value={storeRef.current}>
      {children}
    </EditorStoreContext.Provider>
  );
}
