import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';

import { StepSchema, Step } from './step.schema';
import { ConnectionSchema, Connection } from './connection.schema';

export type AutomationDocument = HydratedDocument<Automation>;

@Schema({
  timestamps: true,
})
export class Automation {
  @Prop({
    type: String,
    required: true,
  })
  accountId: string;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: [StepSchema],
    required: true,
    default: [],
  })
  @Type(() => Step)
  steps: Step[];

  @Prop({
    type: [ConnectionSchema],
    required: true,
    default: [],
  })
  @Type(() => Connection)
  connections: Connection[];
}

export const AutomationSchema = SchemaFactory.createForClass(Automation);
