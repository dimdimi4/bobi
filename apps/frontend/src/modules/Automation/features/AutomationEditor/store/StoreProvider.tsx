// Provider wrapper
import { useRef } from 'react';

import { AutomationDto } from '@/data/sources/api';

import { createStore, EditorStore } from './store';
import { EditorStoreContext } from './context';

type StoreProviderProps = React.PropsWithChildren<{
  automation: AutomationDto;
}>;

export function StoreProvider({ children, automation }: StoreProviderProps) {
  const storeRef = useRef<EditorStore>();
  if (!storeRef.current) {
    storeRef.current = createStore(automation);
  }

  return (
    <EditorStoreContext.Provider value={storeRef.current}>
      {children}
    </EditorStoreContext.Provider>
  );
}
