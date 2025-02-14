import { Automation } from '../schemas/automation.schema';
import { AutomationVersion } from '../schemas/automation-version';

export class AutomationResponseDto {
  automation: Automation;
  publishedVersion?: AutomationVersion;
  draftVersion?: AutomationVersion;
}
