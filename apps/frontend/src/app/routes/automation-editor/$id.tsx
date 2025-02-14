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

  // TODO: move this logic to a backend
  if (!data.draftVersion) {
    return <div>No draft version found</div>;
  }

  return (
    <AutomationEditor
      onExit={handleClose}
      automation={data.automation}
      version={data.draftVersion}
    />
  );
}
