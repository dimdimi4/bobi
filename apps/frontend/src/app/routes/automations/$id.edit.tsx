import { createFileRoute, useRouter } from '@tanstack/react-router';

import { automationQueryOptions } from '@/data/repositories/automations-repository';

import { AutomationEditor } from '@/modules/Automation/features/AutomationEditor';

export const Route = createFileRoute('/automations/$id/edit')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(automationQueryOptions(params.id)),
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const router = useRouter();

  const handleClose = () => {
    setTimeout(() => {
      router.navigate({
        to: '/automations/$id/view',
        params: { id: data.id },
      });
    }, 200);
  };

  return <AutomationEditor onExit={handleClose} />;
}
