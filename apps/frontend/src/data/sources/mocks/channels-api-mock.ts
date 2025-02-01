import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

import { ApiPaths } from './api-schema';
import { ChannelDto, PaginatedChannelsDto } from '../api';

const channelsApiMockHelpers = {
  makeChannelsList(length: number) {
    return Array.from({ length }, (_, i) => this.makeFakeChannel(i));
  },
  makeFakeChannel(index: number): ChannelDto {
    return {
      id: `channel-${index}`,
      name: `Channel ${index}`,
      type: 'telegram',
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };
  },
};

export const channelsApiMockHandlers = [
  http.get(
    `http://localhost${ApiPaths.channelsFindPaginatedV1}`,
    ({ request }) => {
      const list = channelsApiMockHelpers.makeChannelsList(100);

      const url = new URL(request.url);
      const offset = Number(url.searchParams.get('offset'));
      const limit = Number(url.searchParams.get('limit'));

      return HttpResponse.json<PaginatedChannelsDto>({
        total: list.length,
        limit: limit,
        offset: offset,
        results: list.slice(offset, offset + limit),
      });
    }
  ),
];
