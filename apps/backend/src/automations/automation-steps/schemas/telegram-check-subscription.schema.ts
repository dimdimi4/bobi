import { ApiProperty } from '@nestjs/swagger';
import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';

import { StepPosition } from './step-position.schema';
import { Step } from './step.schema';

@Schema({ _id: false })
@Expose()
export class StepTelegramCheckSubscription implements Step {
  id: string;
  position: StepPosition;

  @ApiProperty({
    enum: [StepTelegramCheckSubscription.name],
    description: 'Discriminator field to determine the type of step',
  })
  type: string;

  @Prop({
    type: String,
    required: true,
  })
  channelId: string;
}

export const StepTelegramCheckSubscriptionSchema = SchemaFactory.createForClass(
  StepTelegramCheckSubscription,
);
