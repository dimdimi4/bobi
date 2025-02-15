import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { AutomationStep } from '../schemas/automation-step.schema';
import { AutomationConnection } from '../schemas/automation-connection.schema';

export class CreateStepDto {
  @ValidateNested()
  @Type(() => AutomationStep)
  step: AutomationStep;

  @ValidateNested()
  @IsOptional()
  @Type(() => AutomationConnection)
  connection?: AutomationConnection;
}
