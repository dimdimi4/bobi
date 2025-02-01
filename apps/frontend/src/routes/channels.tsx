import { createFileRoute } from '@tanstack/react-router';
import { channelRepository } from '@/data/repositories/ChannelRepository';

export const Route = createFileRoute('/channels')({
  component: RouteComponent,
  loader: async () => {
    const channels = await channelRepository.getChannels();
    return { channels };
  },
});

function RouteComponent() {
  return <div>Hello "/channels"!</div>;
}
