import { createFileRoute, useRouter } from '@tanstack/react-router';

import { AutomationEditor } from '@/modules/Automation/features/AutomationEditor';
import { automationForUpdateQueryOptions } from '@/data/repositories/automations-repository';

export const Route = createFileRoute('/automation-editor/$id')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(automationForUpdateQueryOptions(params.id)),
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const router = useRouter();

  console.log(data);

  const handleClose = () => {
    router.navigate({
      to: '/automations/$id/view',
      params: { id: data.id },
    });
  };

  return <AutomationEditor onExit={handleClose} automation={data} />;
}
