import { IsString, ValidateNested } from 'class-validator';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { Prop as MongooseProp, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v7 as uuidv7 } from 'uuid';

import { AutomationConnection } from './automation-connection.schema';
import { AutomationStep } from './automation-step.schema';
import { AutomationTrigger } from './automation-trigger.schema';

@Schema({
  timestamps: true,
  collection: 'automation-versions',
})
@Expose()
export class AutomationVersion {
  @MongooseProp({
    default: () => uuidv7(),
    type: String,
    required: true,
  })
  @ApiProperty({
    name: 'id',
  })
  @Expose({ name: 'id' })
  @Transform(({ obj }: { obj: AutomationVersion }) => obj._id)
  _id: string;

  @MongooseProp({
    type: String,
    required: true,
  })
  @Exclude()
  @ApiHideProperty()
  accountId: string;

  @MongooseProp({
    type: String,
    required: true,
  })
  @Exclude()
  @ApiHideProperty()
  @IsString()
  automationId: string;

  @MongooseProp({
    type: AutomationTrigger,
    required: true,
  })
  @ValidateNested()
  @Type(() => AutomationTrigger)
  trigger: AutomationTrigger;

  @MongooseProp({
    type: [AutomationStep],
    required: true,
  })
  @ValidateNested()
  @Type(() => AutomationStep)
  steps: AutomationStep[];

  @MongooseProp({
    type: [AutomationConnection],
    required: true,
  })
  @ValidateNested()
  @Type(() => AutomationConnection)
  connections: AutomationConnection[];

  @MongooseProp({
    type: Date,
    required: false,
  })
  publishedAt?: Date;

  createdAt: Date;
  updatedAt: Date;

  @ApiHideProperty()
  @Exclude()
  __v: number;
}

export type AutomationVersionDocument = HydratedDocument<AutomationVersion>;

export const AutomationVersionSchema =
  SchemaFactory.createForClass(AutomationVersion);
