import { ChannelsApi } from '@/data/sources/api';

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

export const channelRepository = new ChannelRepository(new ChannelsApi());
