import { AutomationVersion } from '@/data/sources/api';
import { Automation } from '@/data/sources/api';

export type AutomationEditorProps = {
  automation: Automation;
  version: AutomationVersion;
  onExit: () => void;
};
