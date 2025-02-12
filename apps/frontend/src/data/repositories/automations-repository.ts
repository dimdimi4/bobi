import { queryOptions } from '@tanstack/react-query';

import { AutomationsApi } from '@/data/sources/api';
import { api } from '@/shared/lib/api-client';

export class AutomationsRepository {
  private automationsApi: AutomationsApi;

  constructor(automationsApi: AutomationsApi) {
    this.automationsApi = automationsApi;
  }

  async getAutomations(page: number = 1, pageSize: number = 10) {
    const offset = (page - 1) * pageSize;
    return this.automationsApi.automationsFindPaginatedV1(offset, pageSize);
  }

  async getAutomation(id: string) {
    return this.automationsApi.automationsFindOneV1(id);
  }
}

export const automationsRepository = new AutomationsRepository(
  new AutomationsApi(undefined, '', api)
);

const KEY = 'automations';

export const automationsQueryOptions = queryOptions({
  queryKey: [KEY],
  queryFn: () => automationsRepository.getAutomations(),
});

export const automationQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [KEY, id],
    queryFn: () => automationsRepository.getAutomation(id),
  });
