import { Prop as MongooseProp, Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

@Schema({ _id: false })
export class TriggerReceivedMessageTask {
  @MongooseProp({
    type: String,
    required: true,
  })
  @IsString()
  condition: string; // any / exact / contains

  @MongooseProp({
    type: [String],
    required: true,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  templates?: string[];
}

@Schema({ _id: false })
export class TelegramSendMessageTask {
  @MongooseProp({
    type: String,
    required: true,
  })
  @IsString()
  message: string;

  @MongooseProp({
    type: [String],
    required: true,
  })
  @IsArray()
  quickReplies: string[];
}

@Schema({ _id: false })
export class AutomationTask {
  @MongooseProp({
    type: TriggerReceivedMessageTask,
    required: false,
  })
  @ValidateNested()
  @Type(() => TriggerReceivedMessageTask)
  trigger_receivedMessage?: TriggerReceivedMessageTask;

  @MongooseProp({
    type: TelegramSendMessageTask,
    required: false,
  })
  @ValidateNested()
  @Type(() => TelegramSendMessageTask)
  action_telegram_sendMessage?: TelegramSendMessageTask;
}
