import { createFileRoute, useRouter } from '@tanstack/react-router';

import { AutomationEditor } from '@/modules/Automation/features/AutomationEditor';

export const Route = createFileRoute('/automations/add')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const handleClose = () => {
    setTimeout(() => {
      router.navigate({ to: '/automations' });
    }, 200);
  };

  return <AutomationEditor onExit={handleClose} />;
}
