import { PickType } from '@nestjs/swagger';
import { CreateAutomationDto } from './create-automation.dto';

export class UpdateAutomationDto extends PickType(CreateAutomationDto, [
  'name',
] as const) {}
