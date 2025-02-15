import { Prop as MongooseProp, Schema } from '@nestjs/mongoose';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { AutomationTask } from './automation-tasks/automation-task.schema';
import { AutomationPosition } from './automation-position.schema';

@Schema({ _id: false })
export class AutomationStep {
  @MongooseProp({
    type: String,
    required: true,
  })
  @IsString()
  id: string;

  @MongooseProp({
    type: AutomationPosition,
    required: true,
  })
  @ValidateNested()
  @Type(() => AutomationPosition)
  position: AutomationPosition;

  @MongooseProp({
    type: AutomationTask,
    required: true,
  })
  @ValidateNested()
  @Type(() => AutomationTask)
  task: AutomationTask;
}
