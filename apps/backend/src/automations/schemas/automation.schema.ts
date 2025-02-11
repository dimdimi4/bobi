import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { Prop as MongooseProp, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v7 as uuidv7 } from 'uuid';
import { AutomationTask } from './automation-tasks.schema';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

@Schema({ _id: false })
export class AutomationStepPosition {
  @MongooseProp({
    type: Number,
    required: true,
  })
  @IsNumber()
  x: number;

  @MongooseProp({
    type: Number,
    required: true,
  })
  @IsNumber()
  y: number;
}

@Schema({ _id: false })
export class AutomationStep {
  @MongooseProp({
    type: String,
    required: true,
  })
  @IsString()
  id: string;

  @MongooseProp({
    type: AutomationStepPosition,
    required: true,
  })
  @ValidateNested()
  position: AutomationStepPosition;

  @MongooseProp({
    type: AutomationTask,
    required: true,
  })
  @ValidateNested()
  task: AutomationTask;
}

@Schema({ _id: false })
export class AutomationConnection {
  @MongooseProp({
    type: String,
    required: true,
  })
  @IsString()
  id: string;

  @MongooseProp({
    type: String,
    required: true,
  })
  @IsString()
  sourceStepId: string;

  @MongooseProp({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  sourceHandleId?: string;

  @MongooseProp({
    type: String,
    required: true,
  })
  @IsString()
  targetStepId: string;

  @MongooseProp({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  targetHandleId?: string;
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
  @Expose()
  name: string;

  @MongooseProp({
    type: [AutomationStep],
    required: true,
  })
  steps: AutomationStep[];

  @MongooseProp({
    type: [AutomationConnection],
    required: true,
  })
  connections: AutomationConnection[];

  createdAt: Date;
  updatedAt: Date;

  @ApiHideProperty()
  @Exclude()
  __v: number;
}

export type AutomationDocument = HydratedDocument<Automation>;

export const AutomationConnectionSchema =
  SchemaFactory.createForClass(AutomationConnection);
export const AutomationSchema = SchemaFactory.createForClass(Automation);
