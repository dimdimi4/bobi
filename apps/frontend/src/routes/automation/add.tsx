import { createFileRoute } from '@tanstack/react-router';

import { AutomationEditor } from '@/modules/Automation/features/AutomationEditor';

export const Route = createFileRoute('/automation/add')({
  component: RouteComponent,
});

function RouteComponent() {
  return <AutomationEditor />;
}
