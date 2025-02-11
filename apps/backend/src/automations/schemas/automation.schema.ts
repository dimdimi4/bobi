import {
  ApiExtraModels,
  ApiHideProperty,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { Prop as MongooseProp, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose, Type } from 'class-transformer';

import { StepSchema, Step } from '../automation-steps/schemas/step.schema';
import { ConnectionSchema, Connection } from './connection.schema';
import { StepTelegramSendMessage } from '../automation-steps/schemas/telegram-send-message.schema';
import { StepTelegramCheckSubscription } from '../automation-steps/schemas/telegram-check-subscription.schema';

export type AutomationDocument = HydratedDocument<Automation>;

@Schema({
  timestamps: true,
})
@ApiExtraModels(StepTelegramSendMessage, StepTelegramCheckSubscription)
@Expose()
export class Automation {
  @MongooseProp({
    type: String,
    required: true,
  })
  @Exclude()
  @ApiHideProperty()
  accountId: string;

  @MongooseProp({
    type: String,
    required: true,
  })
  name: string;

  @MongooseProp({
    type: [StepSchema],
    required: true,
    default: [],
  })
  @ApiProperty({
    type: 'array',
    items: {
      oneOf: [
        { $ref: getSchemaPath(StepTelegramSendMessage) },
        { $ref: getSchemaPath(StepTelegramCheckSubscription) },
      ],
    },
  })
  @Type(() => Step, {
    discriminator: {
      property: 'type',
      subTypes: [
        {
          value: StepTelegramSendMessage,
          name: StepTelegramSendMessage.name,
        },
        {
          value: StepTelegramCheckSubscription,
          name: StepTelegramCheckSubscription.name,
        },
      ],
    },
  })
  steps: Step[];

  @MongooseProp({
    type: [ConnectionSchema],
    required: true,
    default: [],
  })
  @Type(() => Connection)
  connections: Connection[];
}

export const AutomationSchema = SchemaFactory.createForClass(Automation);
