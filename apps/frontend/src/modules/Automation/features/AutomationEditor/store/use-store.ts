// Mimic the hook returned by `create`
import { useContext } from 'react';
import { useStore } from 'zustand';

import { EditorState } from './types';
import { EditorStoreContext } from './context';

export function useEditorStore<T>(selector: (state: EditorState) => T): T {
  const store = useContext(EditorStoreContext);

  if (!store)
    throw new Error('Missing EditorStoreContext.Provider in the tree');

  return useStore(store, selector);
}
