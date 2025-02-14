import { IsOptional, ValidateNested } from 'class-validator';

import { AutomationStep } from '../schemas/automation-step.schema';
import { AutomationConnection } from '../schemas/automation-connection.schema';

export class CreateStepDto {
  @ValidateNested()
  step: AutomationStep;

  @ValidateNested()
  @IsOptional()
  connection?: AutomationConnection;
}
