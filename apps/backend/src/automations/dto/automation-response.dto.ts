import { Automation } from '../schemas/automation.schema';
import { AutomationVersion } from '../schemas/automation-version.schema';

export class AutomationResponseDto {
  automation: Automation;
  publishedVersion?: AutomationVersion;
  draftVersion?: AutomationVersion;
}
