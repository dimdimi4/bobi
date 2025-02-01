import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { MainLayout } from '@/modules/Layouts/features/MainLayout';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <MainLayout>
      <Outlet />
      <TanStackRouterDevtools />
    </MainLayout>
  );
}
