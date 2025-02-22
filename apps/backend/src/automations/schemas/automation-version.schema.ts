import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { Prop as MongooseProp, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v7 as uuidv7 } from 'uuid';

import { AutomationConnection } from './automation-connection.schema';
import { AutomationStep } from './automation-step.schema';

@Schema({
  timestamps: true,
  collection: 'automation-versions',
})
export class AutomationVersion {
  @MongooseProp({
    default: () => uuidv7(),
    type: String,
    required: true,
  })
  _id: string;

  @MongooseProp({
    type: String,
    required: true,
  })
  accountId: string;

  @MongooseProp({
    type: String,
    required: true,
  })
  automationId: string;

  @MongooseProp({
    type: String,
    required: false,
  })
  parentVersionId?: string;

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
}

export type AutomationVersionDocument = HydratedDocument<AutomationVersion>;

export const AutomationVersionSchema =
  SchemaFactory.createForClass(AutomationVersion);
