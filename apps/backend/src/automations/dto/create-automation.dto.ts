import { IsString } from 'class-validator';
import { Automation } from '../schemas/automation.schema';

export class CreateAutomationDto implements Pick<Automation, 'name'> {
  @IsString()
  name: string;
}
