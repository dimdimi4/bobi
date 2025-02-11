import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AutomationsController } from './automations.controller';

import { Automation, AutomationSchema } from './schemas/automation.schema';
import { AutomationsRepository } from './automations.repository';
import { AutomationsService } from './automations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Automation.name,
        schema: AutomationSchema,
      },
    ]),
  ],
  controllers: [AutomationsController],
  providers: [AutomationsRepository, AutomationsService],
})
export class AutomationsModule {}
