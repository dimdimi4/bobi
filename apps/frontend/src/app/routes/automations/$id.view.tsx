import { createFileRoute, Link } from '@tanstack/react-router';
import { automationQueryOptions } from '@/data/repositories/automations-repository';
import { Group } from '@mantine/core';

export const Route = createFileRoute('/automations/$id/view')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(automationQueryOptions(params.id)),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <Group>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Link to={`/automations/$id/edit`} params={{ id: data.id }}>
        Edit
      </Link>
    </Group>
  );
}
