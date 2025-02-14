import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  AutomationsApi,
  CreateAutomationDto,
  CreateStepDto,
} from '@/data/sources/api';
import { api } from '@/shared/lib/api-client';

const KEY = 'automations';

export const automationsApi = new AutomationsApi(undefined, '', api);

export const automationsQueryOptions = queryOptions({
  queryKey: [KEY],
  queryFn: () => automationsApi.automationsFindPaginatedV1(0, 10),
});

export const automationQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [KEY, id],
    queryFn: () => automationsApi.automationsFindOneV1(id),
  });

export function useCreateAutomationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAutomationDto) =>
      automationsApi.automationsCreateV1(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [KEY],
      }),
  });
}

export function useCreateStepMutation(automationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateStepDto) =>
      automationsApi.automationsCreateStepV1(automationId, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [KEY],
      }),
  });
}
