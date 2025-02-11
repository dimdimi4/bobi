import { IsOptional, ValidateNested } from 'class-validator';

import { AutomationStep } from '../schemas/automation.schema';
import { AutomationConnection } from '../schemas/automation.schema';

export class CreateStepDto {
  @ValidateNested()
  step: AutomationStep;

  @ValidateNested()
  @IsOptional()
  connection?: AutomationConnection;
}
