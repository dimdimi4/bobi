import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Exclude, Type } from 'class-transformer';
import { StepTelegramMessage } from './step.telegram-message.schema';

@Schema({ _id: false })
export class Position {
  @Prop({
    type: Number,
    required: true,
  })
  x: number;

  @Prop({
    type: Number,
    required: true,
  })
  y: number;
}

export const PositionSchema = SchemaFactory.createForClass(Position);

@Exclude()
@Schema({ _id: false, discriminatorKey: 'type' })
export class Step {
  @Prop({
    type: String,
    required: true,
  })
  id: string;

  @Type(() => Position)
  @Prop({
    type: PositionSchema,
    required: true,
  })
  position: Position;

  @Prop({
    type: String,
    required: true,
    enum: [StepTelegramMessage.stepName],
  })
  type: string;
}

export const StepSchema = SchemaFactory.createForClass(Step);
