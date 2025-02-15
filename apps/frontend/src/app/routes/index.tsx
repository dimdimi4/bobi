import { MainLayout } from '@/modules/Layouts/features/MainLayout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <MainLayout>
      <h3>Welcome Home!</h3>
    </MainLayout>
  );
}
