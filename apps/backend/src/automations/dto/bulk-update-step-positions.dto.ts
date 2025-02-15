import { IsString, ValidateNested } from 'class-validator';

import { AutomationPosition } from '../schemas/automation-position.schema';
import { Type } from 'class-transformer';

export class StepPositionDto {
  @IsString()
  stepId: string;

  @ValidateNested()
  @Type(() => AutomationPosition)
  position: AutomationPosition;
}

export class UpdateStepsPositionsDto {
  @ValidateNested()
  @Type(() => StepPositionDto)
  steps: StepPositionDto[];
}
