import {
  Controller,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiExtraModels } from '@nestjs/swagger';
import { ChannelsService } from './channels.service';
import { PaginatedDto } from './dto/paginated.dto';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

const accountId = '666666666666666666666666';

@ApiTags('Channel Webhook')
@Controller('channels-webhook')
@ApiExtraModels(PaginatedDto)
export class ChannelsWebhookController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post('telegram/:channelId')
  async telegramWebhook(
    @Param('channelId') channelId: string,
    @Body() body: any,
  ) {
    const channel = await this.channelsService.findOne(accountId, channelId);

    if (!channel) {
      throw new NotFoundException('Channel not found');
    }

    const bot = new Telegraf(channel.token);

    bot.on(message('text'), async (ctx) => {
      console.log(ctx);

      // Using context shortcut
      await ctx.reply(`Hello ${ctx.state.role}`);
    });

    await bot.handleUpdate(body);
  }
}
