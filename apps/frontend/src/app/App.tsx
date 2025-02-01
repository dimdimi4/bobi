import { createRouter, RouterProvider } from '@tanstack/react-router';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import { routeTree } from '@/routeTree.gen';

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
