import { AutomationVersionDto } from './automation-version.dto';

import { AutomationStep } from '../schemas/automation-step.schema';
import { AutomationConnection } from '../schemas/automation-connection.schema';
import { PickType } from '@nestjs/swagger';
import { AutomationBaseDto } from './automation-base.dto';

export class AutomationDto extends PickType(AutomationBaseDto, [
  'id',
  'name',
  'status',
  'createdAt',
  'updatedAt',
] as const) {
  steps: AutomationStep[];
  connections: AutomationConnection[];
  version: AutomationVersionDto;
}
