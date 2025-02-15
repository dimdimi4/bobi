import { Type } from 'class-transformer';
import { PickType } from '@nestjs/swagger';

import { AutomationBaseDto } from './automation-base.dto';
import { AutomationVersionDto } from './automation-version.dto';

import { AutomationStep } from '../schemas/automation-step.schema';
import { AutomationConnection } from '../schemas/automation-connection.schema';
export class AutomationDto extends PickType(AutomationBaseDto, [
  'id',
  'name',
  'status',
  'createdAt',
  'updatedAt',
] as const) {
  @Type(() => AutomationStep)
  steps: AutomationStep[];

  @Type(() => AutomationConnection)
  connections: AutomationConnection[];

  @Type(() => AutomationVersionDto)
  version: AutomationVersionDto;
}
