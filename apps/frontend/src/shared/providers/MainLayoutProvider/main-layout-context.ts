import { createContext } from 'react';

export type MainLayoutContextType = {
  fullscreen: boolean;
  toggleFullscreen: () => void;
};

export const MainLayoutContext = createContext<MainLayoutContextType>({
  fullscreen: false,
  toggleFullscreen: () => {},
});
