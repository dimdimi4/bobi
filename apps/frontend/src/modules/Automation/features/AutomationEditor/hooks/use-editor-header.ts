import { useQuery } from '@tanstack/react-query';
import {
  automationForUpdateQueryOptions,
  useActivateMutation,
  useDeactivateMutation,
  useDiscardChangesMutation,
  usePublishChangesMutation,
} from '@/data/repositories/automations-repository';

import { useEditorStore } from '../store';

export function useEditorHeader() {
  const automationId = useEditorStore((s) => s.automationId);
  const updatingSteps = useEditorStore((s) => s.updatingSteps);

  const { data: automation, isFetched: isAutomationFetched } = useQuery(
    automationForUpdateQueryOptions(automationId)
  );

  const { mutate: activate, isPending: isActivatePending } =
    useActivateMutation(automationId);
  const { mutate: deactivate, isPending: isDeactivatePending } =
    useDeactivateMutation(automationId);
  const { mutate: discardChanges, isPending: isDiscardChangesPending } =
    useDiscardChangesMutation(automationId);
  const { mutate: publishChanges, isPending: isPublishChangesPending } =
    usePublishChangesMutation(automationId);

  return {
    automation: automation!,
    updatingSteps,
    isAutomationFetched,
    isActivatePending,
    isDeactivatePending,
    isDiscardChangesPending,
    isPublishChangesPending,
    activate,
    deactivate,
    discardChanges,
    publishChanges,
  };
}
