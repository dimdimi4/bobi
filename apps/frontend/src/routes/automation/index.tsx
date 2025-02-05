import { Button, Container, Group, Title } from '@mantine/core';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/automation/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container size="sm">
      <Group justify="space-between">
        <Title order={3}>Hello "/automation"!</Title>
        <Button
          variant="outline"
          size="xs"
          component={Link}
          to="/automation/add"
        >
          Click me
        </Button>
      </Group>
    </Container>
  );
}
