import { createFileRoute, Outlet } from '@tanstack/react-router';

import { MainLayout } from '@/modules/Layouts/features/MainLayout';

export const Route = createFileRoute('/automations')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
