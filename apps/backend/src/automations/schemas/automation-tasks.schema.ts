import { Prop as MongooseProp, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsString, ValidateNested } from 'class-validator';

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

export const TelegramSendMessageTaskSchema = SchemaFactory.createForClass(
  TelegramSendMessageTask,
);

@Schema({ _id: false })
export class AutomationTask {
  @MongooseProp({
    type: TelegramSendMessageTask,
    required: false,
  })
  @ValidateNested()
  telegram_sendMessage?: TelegramSendMessageTask;
}

export const AutomationTaskSchema =
  SchemaFactory.createForClass(AutomationTask);
