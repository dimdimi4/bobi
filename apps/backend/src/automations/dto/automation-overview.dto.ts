import { AutomationVersion } from '../schemas/automation-version.schema';
import { AutomationStep } from '../schemas/automation-step.schema';
import { AutomationConnection } from '../schemas/automation-connection.schema';
import { AutomationBaseDto } from './automation-base.dto';
import { PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AutomationVersionOverviewDto
  implements
    Pick<
      AutomationVersion,
      'steps' | 'connections' | 'publishedAt' | 'createdAt' | 'updatedAt'
    >
{
  id: string;

  @Type(() => Date)
  publishedAt?: Date;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  @Type(() => AutomationStep)
  steps: AutomationStep[];

  @Type(() => AutomationConnection)
  connections: AutomationConnection[];
}

export class AutomationOverviewDto extends PickType(AutomationBaseDto, [
  'id',
  'name',
  'status',
  'createdAt',
  'updatedAt',
] as const) {
  @Type(() => AutomationVersionOverviewDto)
  publishedVersion?: AutomationVersionOverviewDto;

  @Type(() => AutomationVersionOverviewDto)
  draftVersion?: AutomationVersionOverviewDto;
}
