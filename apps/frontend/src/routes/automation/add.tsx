import { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { AutomationEditor } from '@/modules/Automation/features/AutomationEditor';

export const Route = createFileRoute('/automation/add')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const handleClose = () => {
    setTimeout(() => {
      router.navigate({ to: '/automation' });
    }, 200);
  };

  return <AutomationEditor opened onClose={handleClose} />;
}
