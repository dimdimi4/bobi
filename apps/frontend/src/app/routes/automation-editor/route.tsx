import { createFileRoute, Outlet } from '@tanstack/react-router';
import { FullscreenLayout } from '@/modules/Layouts/features/FullscreenLayout';

export const Route = createFileRoute('/automation-editor')({
  component: () => (
    <FullscreenLayout>
      <Outlet />
    </FullscreenLayout>
  ),
});
