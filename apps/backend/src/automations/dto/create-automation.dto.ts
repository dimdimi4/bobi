import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Automation } from '../schemas/automation.schema';
import { TriggerReceivedMessageTask } from '../schemas/automation-tasks.schema';

export class CreateAutomationDto implements Pick<Automation, 'name'> {
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => TriggerReceivedMessageTask)
  trigger?: TriggerReceivedMessageTask;
}
