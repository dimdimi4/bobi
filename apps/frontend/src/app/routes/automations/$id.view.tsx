import { createFileRoute, Link } from '@tanstack/react-router';
import { automationOverviewQueryOptions } from '@/data/repositories/automations-repository';
import { Group } from '@mantine/core';

export const Route = createFileRoute('/automations/$id/view')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(automationOverviewQueryOptions(params.id)),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <Group>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Link to="/automation-editor/$id" params={{ id: data.id }}>
        Edit
      </Link>
    </Group>
  );
}
