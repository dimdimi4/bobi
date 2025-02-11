import { Prop as MongooseProp, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class TelegramSendMessageTask {
  @MongooseProp({
    type: String,
    required: true,
  })
  message: string;

  @MongooseProp({
    type: [String],
    required: true,
  })
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
  telegram_sendMessage?: TelegramSendMessageTask;
}

export const AutomationTaskSchema =
  SchemaFactory.createForClass(AutomationTask);
