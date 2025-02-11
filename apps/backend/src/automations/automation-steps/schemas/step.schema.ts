import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';

import { StepPosition } from './step-position.schema';

import { StepTelegramSendMessage } from './telegram-send-message.schema';
import { StepTelegramCheckSubscription } from './telegram-check-subscription.schema';

const STEP_TYPES = [
  StepTelegramSendMessage.name,
  StepTelegramCheckSubscription.name,
];

@Schema({ _id: false, discriminatorKey: 'type' })
@Expose()
export class Step {
  @Prop({
    type: String,
    required: true,
  })
  id: string;

  @Prop({
    type: StepPosition,
    required: true,
  })
  position: StepPosition;

  @Prop({
    type: String,
    required: true,
    enum: STEP_TYPES,
  })
  type: string;
}

export const StepSchema = SchemaFactory.createForClass(Step);
