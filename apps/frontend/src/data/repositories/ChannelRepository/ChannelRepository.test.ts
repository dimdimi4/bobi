import { describe, it, expect, afterEach, afterAll, beforeAll } from 'vitest';
import {
  ChannelRepository,
  createChannelRepository,
} from './ChannelRepository';
import server from '@/data/sources/mocks/mock-server';

describe('ChannelRepository', () => {
  let channelRepository: ChannelRepository;

  beforeAll(() => {
    channelRepository = createChannelRepository();
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
      // Arrange
      const expectedOffset = 0;
      const expectedPageSize = 10;

      // Act
      const result = await channelRepository.getChannels();

      // Assert
      expect(result.data.offset).toEqual(expectedOffset);
      expect(result.data.limit).toEqual(expectedPageSize);
    });
  });
});
