import { createRouter, RouterProvider } from '@tanstack/react-router';
import '@mantine/core/styles.css';

import { routeTree } from '@/routeTree.gen';
import { ThemeProvider } from './ThemeProvider';

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
