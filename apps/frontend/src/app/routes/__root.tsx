import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { MainLayoutProvider } from '@/shared/providers/MainLayoutProvider';
import { MainLayout } from '@/modules/Layouts/features/MainLayout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
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
      <ReactQueryDevtools />
    </>
  );
}
