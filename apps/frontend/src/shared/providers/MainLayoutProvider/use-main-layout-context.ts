import { useContext } from 'react';
import { MainLayoutContext } from './main-layout-context';

export function useMainLayoutContext() {
  const context = useContext(MainLayoutContext);

  if (!context) {
    throw new Error(
      'useMainLayoutContext must be used within a MainLayoutProvider'
    );
  }

  return context;
}
