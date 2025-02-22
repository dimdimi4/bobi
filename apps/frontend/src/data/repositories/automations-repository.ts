import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  AutomationConnection,
  AutomationDto,
  AutomationsApi,
  AutomationTask,
  CreateAutomationDto,
  CreateStepDto,
  UpdateStepsPositionsDto,
} from '@/data/sources/api';
import { api } from '@/shared/lib/api-client';

const KEY = 'automations';

export const automationsApi = new AutomationsApi(undefined, '', api);

export const automationsQueryOptions = queryOptions({
  queryKey: [KEY],
  queryFn: async () =>
    automationsApi.automationsListPaginatedV1({
      offset: 0,
      limit: 10,
    }),
});

export const automationOverviewQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [KEY, id, 'overview'],
    queryFn: async () => automationsApi.automationsFindOneOverviewV1({ id }),
  });

export const automationForUpdateQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [KEY, id, 'for-update'],
    queryFn: async () => automationsApi.automationsFindOneForUpdateV1({ id }),
  });

export function useCreateAutomationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateAutomationDto) =>
      automationsApi.automationsCreateV1({ createAutomationDto: payload }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [KEY],
      }),
  });
}

export function useCreateStepMutation(automationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateStepDto) =>
      automationsApi.automationsCreateStepV1({
        id: automationId,
        createStepDto: payload,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [KEY, automationId],
      }),
  });
}

export function useUpdateStepPositionsMutation(automationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateStepsPositionsDto) =>
      automationsApi.automationsUpdateStepsPositionsV1({
        id: automationId,
        updateStepsPositionsDto: payload,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [KEY, automationId],
      }),
  });
}

export function useDeleteStepsMutation(automationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (stepIds: string[]) =>
      automationsApi.automationsDeleteStepsV1({
        id: automationId,
        deleteStepsDto: { stepIds },
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [KEY, automationId],
      }),
  });
}

export function useCreateConnectionMutation(automationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AutomationConnection) =>
      automationsApi.automationsCreateConnectionV1({
        id: automationId,
        automationConnection: payload,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [KEY, automationId],
      }),
  });
}

export function useDeleteConnectionsMutation(automationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (connectionIds: string[]) =>
      automationsApi.automationsDeleteConnectionsV1({
        id: automationId,
        deleteConnectionsDto: { connectionIds },
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [KEY, automationId],
      }),
  });
}

export function useUpdateStepTaskMutation(
  automationId: string,
  stepId: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AutomationTask) =>
      automationsApi.automationsUpdateStepTaskV1({
        id: automationId,
        stepId: stepId,
        automationTask: payload,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [KEY, automationId],
      }),
  });
}

function useUpdateMutation(
  automationId: string,
  mutationFn: () => Promise<AutomationDto>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [KEY, automationId],
      }),
  });
}

export function useDiscardChangesMutation(automationId: string) {
  return useUpdateMutation(automationId, async () =>
    automationsApi.automationsDiscardChangesV1({ id: automationId })
  );
}

export function usePublishChangesMutation(automationId: string) {
  return useUpdateMutation(automationId, async () =>
    automationsApi.automationsPublishChangesV1({ id: automationId })
  );
}

export function useActivateMutation(automationId: string) {
  return useUpdateMutation(automationId, async () =>
    automationsApi.automationsActivateV1({ id: automationId })
  );
}

export function useDeactivateMutation(automationId: string) {
  return useUpdateMutation(automationId, async () =>
    automationsApi.automationsDeactivateV1({ id: automationId })
  );
}
