import { Type } from 'class-transformer';
import { PickType } from '@nestjs/swagger';

import { AutomationBaseDto } from './automation-base.dto';

import { AutomationStep } from '../schemas/automation-step.schema';
import { AutomationConnection } from '../schemas/automation-connection.schema';

export enum AutomationVersionType {
  MAIN = 'main',
  DRAFT = 'draft',
  REVISION = 'revision',
}

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

  hasDraftVersion: boolean;
  hasPublishedVersion: boolean;
  versionType: AutomationVersionType;
}
