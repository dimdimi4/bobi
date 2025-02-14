import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AutomationsController } from './automations.controller';

import { Automation, AutomationSchema } from './schemas/automation.schema';
import {
  AutomationVersion,
  AutomationVersionSchema,
} from './schemas/automation-version.schema';

import { AutomationsRepository } from './repositories/automation.repository';
import { AutomationVersionRepository } from './repositories/automation-version.repository';

import { AutomationsService } from './automations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Automation.name,
        schema: AutomationSchema,
      },
      {
        name: AutomationVersion.name,
        schema: AutomationVersionSchema,
      },
    ]),
  ],
  controllers: [AutomationsController],
  providers: [
    AutomationsService,
    AutomationsRepository,
    AutomationVersionRepository,
  ],
})
export class AutomationsModule {}
