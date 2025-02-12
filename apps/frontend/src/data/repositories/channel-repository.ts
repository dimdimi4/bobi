import { queryOptions } from '@tanstack/react-query';

import { ChannelsApi } from '@/data/sources/api';
import { api } from '@/shared/lib/api-client';

export class ChannelRepository {
  private channelsApi: ChannelsApi;

  constructor(channelsApi: ChannelsApi) {
    this.channelsApi = channelsApi;
  }

  async getChannels(page: number = 1, pageSize: number = 10) {
    const offset = (page - 1) * pageSize;
    return this.channelsApi.channelsFindPaginatedV1(offset, pageSize);
  }
}

export const channelRepository = new ChannelRepository(
  new ChannelsApi(undefined, '', api)
);

export const channelsQueryOptions = queryOptions({
  queryKey: ['channels'],
  queryFn: () => channelRepository.getChannels(),
});
