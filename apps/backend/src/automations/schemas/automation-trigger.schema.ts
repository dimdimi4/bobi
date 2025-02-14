import { Prop as MongooseProp, Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

@Schema({ _id: false })
export class AutomationTriggerMessage {
  @MongooseProp({
    type: String,
    required: true,
  })
  @IsString()
  condition: string;

  @MongooseProp({
    type: [String],
    required: true,
  })
  @IsArray()
  message: string[];
}

@Schema({ _id: false })
export class AutomationTrigger {
  @MongooseProp({
    type: AutomationTriggerMessage,
    required: true,
  })
  @ValidateNested()
  @Type(() => AutomationTriggerMessage)
  message: AutomationTriggerMessage;
}
