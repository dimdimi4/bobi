import { IsString, ValidateNested } from 'class-validator';

import { AutomationPosition } from '../schemas/automation-position.schema';

export class StepPositionDto {
  @IsString()
  stepId: string;

  @ValidateNested()
  position: AutomationPosition;
}

export class UpdateStepsPositionsDto {
  @ValidateNested()
  steps: StepPositionDto[];
}
