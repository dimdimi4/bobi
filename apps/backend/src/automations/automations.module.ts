import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  StepTelegramMessageSchema,
  StepTelegramMessage,
} from './schemas/step.telegram-message.schema';

import { AutomationsController } from './controllers/automations.controller';
import { AutomationController } from './controllers/automation.controller';

import { Automation, AutomationSchema } from './schemas/automation.schema';
import { AutomationsRepository } from './automations.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Automation.name,
        schema: AutomationSchema,
        discriminators: [
          {
            name: StepTelegramMessage.name,
            schema: StepTelegramMessageSchema,
          },
        ],
      },
    ]),
  ],
  controllers: [AutomationsController, AutomationController],
  providers: [AutomationsRepository],
})
export class AutomationsModule {}
