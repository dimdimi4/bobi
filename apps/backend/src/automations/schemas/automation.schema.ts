import { HydratedDocument } from 'mongoose';
import { Prop as MongooseProp, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v7 as uuidv7 } from 'uuid';

export enum AutomationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Schema({
  timestamps: true,
})
export class Automation {
  @MongooseProp({
    default: () => uuidv7(),
    type: String,
    required: true,
  })
  _id: string;

  @MongooseProp({ type: String, required: true })
  accountId: string;

  @MongooseProp({
    type: String,
    required: true,
  })
  name: string;

  @MongooseProp({ type: String, required: false })
  publishedVersionId?: string;

  @MongooseProp({ type: String, required: false })
  draftVersionId?: string;

  @MongooseProp({
    type: String,
    enum: AutomationStatus,
    default: AutomationStatus.INACTIVE,
  })
  status: AutomationStatus;

  createdAt: Date;
  updatedAt: Date;
}

export type AutomationDocument = HydratedDocument<Automation>;

export const AutomationSchema = SchemaFactory.createForClass(Automation);
