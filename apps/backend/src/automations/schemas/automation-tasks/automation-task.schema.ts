import { Prop as MongooseProp, Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { TriggerReceivedMessageTask } from './trigger-receivedMessage.schema';
import { TelegramSendMessageTask } from './telegram-sendMessage.schema';

@Schema({ _id: false })
export class AutomationTask {
  @MongooseProp({
    type: TriggerReceivedMessageTask,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TriggerReceivedMessageTask)
  trigger_receivedMessage?: TriggerReceivedMessageTask;

  @MongooseProp({
    type: TelegramSendMessageTask,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TelegramSendMessageTask)
  action_telegram_sendMessage?: TelegramSendMessageTask;
}
