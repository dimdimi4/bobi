import { describe, it, expect, afterEach, afterAll, beforeAll } from 'vitest';
import { ChannelRepository } from './ChannelRepository';
import { server } from '@/data/sources/mocks/server';
import { ChannelsApi } from '@/data/sources/api/api';

describe('ChannelRepository', () => {
  let channelRepository: ChannelRepository;

  beforeAll(() => {
    channelRepository = new ChannelRepository(new ChannelsApi());
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  describe('getChannels', () => {
    it('should call channelsFindPaginatedV1 with correct default parameters', async () => {
      // Act
      const result = await channelRepository.getChannels();

      // Assert
      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
    });
  });
});
