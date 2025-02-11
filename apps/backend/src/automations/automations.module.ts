import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AutomationsController } from './automations.controller';

import { Automation, AutomationSchema } from './schemas/automation.schema';
import { AutomationsRepository } from './automations.repository';
import {
  StepTelegramSendMessage,
  StepTelegramSendMessageSchema,
} from './automation-steps/schemas/telegram-send-message.schema';
import {
  StepTelegramCheckSubscription,
  StepTelegramCheckSubscriptionSchema,
} from './automation-steps/schemas/telegram-check-subscription.schema';
import { AutomationStepsRepository } from './automation-steps/automation-steps.repository';
import { AutomationStepsController } from './automation-steps/automation-steps.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Automation.name,
        schema: AutomationSchema,
        discriminators: [
          {
            name: StepTelegramSendMessage.name,
            schema: StepTelegramSendMessageSchema,
          },
          {
            name: StepTelegramCheckSubscription.name,
            schema: StepTelegramCheckSubscriptionSchema,
          },
        ],
      },
    ]),
  ],
  controllers: [AutomationsController, AutomationStepsController],
  providers: [AutomationsRepository, AutomationStepsRepository],
})
export class AutomationsModule {}
