import { IsString, ValidateNested } from 'class-validator';

import { AutomationStepPosition } from '../schemas/automation-step.schema';

export class StepPositionDto {
  @IsString()
  stepId: string;

  @ValidateNested()
  position: AutomationStepPosition;
}

export class UpdateStepsPositionsDto {
  @ValidateNested()
  steps: StepPositionDto[];
}
