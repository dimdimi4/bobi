import { Button, Container, Group, Title } from '@mantine/core';
import { createFileRoute, Link } from '@tanstack/react-router';
import { automationsQueryOptions } from '@/data/repositories/automations-repository';

export const Route = createFileRoute('/automations/')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(automationsQueryOptions),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <Container size="sm">
      <Group justify="space-between">
        <Title order={3}>Hello "/automation"!</Title>
        <Button
          variant="outline"
          size="xs"
          component={Link}
          to="/automations/add"
        >
          Click me
        </Button>
      </Group>
      <ul>
        {data.results.map((automation) => (
          <li key={automation.id}>
            <Link to={`/automations/$id/view`} params={{ id: automation.id }}>
              {automation.name}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
