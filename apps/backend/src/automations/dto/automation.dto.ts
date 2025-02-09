import { Expose, Type } from 'class-transformer';

import { Automation } from '../schemas/automation.schema';
import { ApiProperty } from '@nestjs/swagger';

export class AutomationDto implements Omit<Automation, 'accountId'> {
  @Expose()
  @ApiProperty()
  readonly id: string;

  @Expose()
  @ApiProperty()
  readonly name: string;

  @Expose()
  @Type(() => StepDto)
  @ApiProperty()
  readonly steps: StepDto[];

  @Expose()
  @Type(() => ConnectionDto)
  @ApiProperty()
  readonly connections: ConnectionDto[];

  @Expose()
  @ApiProperty()
  readonly createdAt: string;

  @Expose()
  @ApiProperty()
  readonly updatedAt: string;
}

export class ConnectionDto {
  id: string;
  sourceStepId: string;
  sourceHandleId?: string;
  targetStepId: string;
  targetHandleId?: string;
}

export class PositionDto {
  x: number;
  y: number;
}

export class StepDto {
  id: string;

  @Type(() => PositionDto)
  position: PositionDto;

  type: string;
}
