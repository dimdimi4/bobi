import { IsString } from 'class-validator';

import { Automation } from '../schemas/automation.schema';

export class UpdateAutomationDto implements Pick<Automation, 'name'> {
  @IsString()
  name: string;
}
