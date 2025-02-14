import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AutomationsController } from './automations.controller';

import { Automation, AutomationSchema } from './schemas/automation.schema';
import {
  AutomationFlow,
  AutomationFlowSchema,
} from './schemas/automation-version';

import { AutomationFlowRepository } from './repositories/automation-flow.repository';
import { AutomationsService } from './automations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Automation.name,
        schema: AutomationSchema,
      },
      {
        name: AutomationFlow.name,
        schema: AutomationFlowSchema,
      },
    ]),
  ],
  controllers: [AutomationsController],
  providers: [AutomationFlowRepository, AutomationsService],
})
export class AutomationsModule {}
