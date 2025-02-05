import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { MainLayoutProvider } from '@/shared/providers/MainLayoutProvider';
import { MainLayout } from '@/modules/Layouts/features/MainLayout';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <MainLayoutProvider>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </MainLayoutProvider>
      <TanStackRouterDevtools />
    </>
  );
}
