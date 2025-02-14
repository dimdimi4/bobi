import { createFileRoute, Outlet } from '@tanstack/react-router';

import { MainLayout } from '@/modules/Layouts/features/MainLayout';

export const Route = createFileRoute('/automations')({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
});
