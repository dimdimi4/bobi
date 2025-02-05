import { Button, Container, Group, Title } from '@mantine/core';
import { createFileRoute, Link } from '@tanstack/react-router';
import { channelRepository } from '@/data/repositories/ChannelRepository';

export const Route = createFileRoute('/channels')({
  component: RouteComponent,
  loader: async () => {
    return channelRepository.getChannels();
  },
});

function RouteComponent() {
  const { data } = Route.useLoaderData();

  return (
    <Container size="sm">
      <Group justify="space-between">
        <Title order={2}>Channels</Title>
        <Button
          variant="outline"
          size="xs"
          component={Link}
          to="/create-channel"
        >
          Create Channel
        </Button>
      </Group>
      <ul>
        {data.results.map((channel) => (
          <li key={channel.id}>
            {channel.name} - {channel.type}
          </li>
        ))}
      </ul>
    </Container>
  );
}
