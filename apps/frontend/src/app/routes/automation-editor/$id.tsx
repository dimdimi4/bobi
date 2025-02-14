import { createFileRoute, useRouter } from '@tanstack/react-router';

import { automationQueryOptions } from '@/data/repositories/automations-repository';

import { AutomationEditor } from '@/modules/Automation/features/AutomationEditor';

export const Route = createFileRoute('/automation-editor/$id')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(automationQueryOptions(params.id)),
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const router = useRouter();

  const handleClose = () => {
    router.navigate({
      to: '/automations/$id/view',
      params: { id: data.automation.id },
    });
  };

  return <AutomationEditor onExit={handleClose} automation={data.automation} />;
}
