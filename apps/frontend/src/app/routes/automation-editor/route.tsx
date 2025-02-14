import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/automation-editor')({
  component: () => <Outlet />,
});
