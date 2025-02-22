import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChannelSchema, Channel } from './schemas/channel.schema';

import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { ChannelsRepository } from './channels.repository';
import { ChannelsWebhookController } from './channels-webhook.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
  ],
  controllers: [ChannelsController, ChannelsWebhookController],
  providers: [ChannelsService, ChannelsRepository],
})
export class ChannelsModule {}
