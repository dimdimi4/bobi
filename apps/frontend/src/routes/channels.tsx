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
    <div>
      <h2>Channels</h2>
      <Link to="/create-channel">Create Channel</Link>
      <ul>
        {data.results.map((channel) => (
          <li key={channel.id}>
            {channel.name} - {channel.type}
          </li>
        ))}
      </ul>
    </div>
  );
}
