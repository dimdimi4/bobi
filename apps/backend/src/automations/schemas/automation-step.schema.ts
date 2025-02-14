import { Prop as MongooseProp, Schema } from '@nestjs/mongoose';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { AutomationTask } from './automation-tasks.schema';
import { Type } from 'class-transformer';

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
  @Type(() => AutomationStepPosition)
  position: AutomationStepPosition;

  @MongooseProp({
    type: AutomationTask,
    required: true,
  })
  @ValidateNested()
  @Type(() => AutomationTask)
  task: AutomationTask;
}
