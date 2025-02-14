import { Automation } from '@/data/sources/api';

export type CreateAutomationProps = {
  onSuccess?: (automation: Automation) => void;
};
