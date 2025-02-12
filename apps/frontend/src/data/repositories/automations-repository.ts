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

export const automationsQueryOptions = queryOptions({
  queryKey: [AutomationsRepository.name],
  queryFn: () => automationsRepository.getAutomations(),
});

export const automationQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [AutomationsRepository.name, id],
    queryFn: () => automationsRepository.getAutomation(id),
  });
