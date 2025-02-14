import { Automation } from '@/data/sources/api';

export type CreateAutomationProps = {
  onSuccess?: (automation: Automation) => void;
};

export const TriggerCondition = {
  ANY: 'any',
  EXACT: 'exact',
  CONTAINS: 'contains',
} as const;

export type TriggerCondition =
  (typeof TriggerCondition)[keyof typeof TriggerCondition];
