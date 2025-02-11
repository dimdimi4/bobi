import {
  IsString,
  IsNumber,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import {
  AutomationConnection,
  AutomationStep,
  AutomationStepPosition,
} from '../schemas/automation.schema';
import { AutomationTask } from '../schemas/automation-tasks.schema';

import { TelegramSendMessageTaskDto } from './tasks.dto';

export class AutomationStepPositionDto implements AutomationStepPosition {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;
}

export class AutomationStepTaskDto implements AutomationTask {
  @ValidateNested()
  telegram_sendMessage?: TelegramSendMessageTaskDto;
}

export class AutomationStepDto implements AutomationStep {
  @IsString()
  id: string;

  @ValidateNested()
  position: AutomationStepPositionDto;

  @ValidateNested()
  task: AutomationStepTaskDto;
}

export class AutomationConnectionDto implements AutomationConnection {
  @IsString()
  id: string;

  @IsString()
  sourceStepId: string;

  @IsString()
  targetStepId: string;

  @IsString()
  @IsOptional()
  sourceHandleId?: string;

  @IsString()
  @IsOptional()
  targetHandleId?: string;
}

export class CreateStepDto {
  @ValidateNested()
  step: AutomationStepDto;

  @ValidateNested()
  @IsOptional()
  connection?: AutomationConnectionDto;
}

export class UpdateStepTaskDto extends AutomationStepTaskDto {}

export class UpdateStepPositionsDto {
  @IsString()
  stepId: string;

  @ValidateNested()
  position: AutomationStepPositionDto;
}

export class BulkUpdateStepPositionsDto {
  @ValidateNested()
  steps: UpdateStepPositionsDto[];
}

export class CreateConnectionDto extends AutomationConnectionDto {}
