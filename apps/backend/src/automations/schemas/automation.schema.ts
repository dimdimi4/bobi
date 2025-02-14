import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
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
@Expose()
export class Automation {
  @MongooseProp({
    default: () => uuidv7(),
    type: String,
    required: true,
  })
  @ApiProperty({
    name: 'id',
  })
  @Expose({ name: 'id' })
  @Transform(({ obj }: { obj: Automation }) => obj._id)
  _id: string;

  @MongooseProp({ type: String, required: true })
  @ApiHideProperty()
  accountId: string;

  @MongooseProp({
    type: String,
    required: true,
  })
  name: string;

  @MongooseProp({ type: String, required: false })
  currentVersion?: string;

  @MongooseProp({ type: String, required: false })
  draftVersion?: string;

  @MongooseProp({
    type: String,
    enum: AutomationStatus,
    default: AutomationStatus.INACTIVE,
  })
  status: AutomationStatus;

  createdAt: Date;
  updatedAt: Date;

  @ApiHideProperty()
  @Exclude()
  __v: number;
}

export type AutomationDocument = HydratedDocument<Automation>;

export const AutomationSchema = SchemaFactory.createForClass(Automation);
