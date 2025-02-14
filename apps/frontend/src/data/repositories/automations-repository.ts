import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { AutomationsApi, CreateAutomationDto } from '@/data/sources/api';
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

  async createAutomation(payload: CreateAutomationDto) {
    return this.automationsApi.automationsCreateV1(payload);
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

export function useCreateAutomationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAutomationDto) =>
      automationsRepository.createAutomation(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [AutomationsRepository.name],
      }),
  });
}
