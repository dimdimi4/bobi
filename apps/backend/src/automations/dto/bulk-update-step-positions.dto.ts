import { IsString, ValidateNested } from 'class-validator';

import { AutomationStepPosition } from '../schemas/automation.schema';

export class UpdateStepPositionsDto {
  @IsString()
  stepId: string;

  @ValidateNested()
  position: AutomationStepPosition;
}

export class BulkUpdateStepPositionsDto {
  @ValidateNested()
  steps: UpdateStepPositionsDto[];
}
