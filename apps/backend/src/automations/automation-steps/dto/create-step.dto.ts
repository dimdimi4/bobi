import { IsString, IsNumber, ValidateNested, IsEnum } from 'class-validator';
import { StepPosition } from '../schemas/step-position.schema';

export class StepPositionDto implements StepPosition {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;
}

export class CreateStepDto {
  @ValidateNested()
  position: StepPositionDto;

  @IsEnum(['StepTelegramSendMessage', 'StepTelegramCheckSubscription'])
  type: string;
}

export class CreateStepTelegramSendMessageDto extends CreateStepDto {
  @IsString()
  message: string;
}
