import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Automation } from '../schemas/automation.schema';
import { AutomationVersion } from '../schemas/automation-version.schema';
import { AutomationTrigger } from '../schemas/automation-trigger.schema';

export class CreateAutomationDto
  implements
    Pick<Automation, 'name'>,
    Partial<Pick<AutomationVersion, 'trigger'>>
{
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => AutomationTrigger)
  @IsOptional()
  trigger?: AutomationTrigger;
}
