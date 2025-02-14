import { createContext } from 'react';

import { EditorStore } from './store';

export const EditorStoreContext = createContext<EditorStore | null>(null);
