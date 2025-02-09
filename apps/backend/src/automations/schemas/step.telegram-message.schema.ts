import { Type } from 'class-transformer';
import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';

import { Position, Step } from './step.schema';

@Schema({ _id: false })
export class StepTelegramMessageData {
  @Prop({
    type: String,
    required: true,
  })
  message: string;
}

export const StepTelegramMessageDataSchema = SchemaFactory.createForClass(
  StepTelegramMessageData,
);

@Schema({ _id: false })
export class StepTelegramMessage implements Step {
  static readonly stepName = 'message::telegram';

  id: string;
  position: Position;
  type: string;

  @Prop({
    type: StepTelegramMessageDataSchema,
    required: true,
  })
  @Type(() => StepTelegramMessageData)
  data: StepTelegramMessageData;
}

export const StepTelegramMessageSchema =
  SchemaFactory.createForClass(StepTelegramMessage);
