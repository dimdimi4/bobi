import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiExtraModels,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ChannelDto } from './dto/channel.dto';
import { PaginatedDto } from './dto/paginated.dto';
import { PaginatedChannelsDto } from './dto/paginated-channels.dto';

const accountId = '666666666666666666666666';

@ApiTags('Channels')
@Controller('channels')
@ApiExtraModels(PaginatedDto)
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new channel',
  })
  @ApiCreatedResponse({
    description: 'Channel created successfully',
    type: ChannelDto,
  })
  async create(@Body() createChannelDto: CreateChannelDto) {
    return this.channelsService.create(accountId, createChannelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all channels' })
  @ApiOkResponse({
    description: 'Return paginated channels',
    type: PaginatedChannelsDto,
  })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findPaginated(
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ) {
    return this.channelsService.findPaginated(accountId, offset, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a channel by id' })
  @ApiOkResponse({
    description: 'Return a channel',
    type: ChannelDto,
  })
  async findOne(@Param('id') id: string) {
    return this.channelsService.findOne(accountId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a channel' })
  @ApiOkResponse({
    description: 'Channel updated successfully',
    type: ChannelDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateChannelDto: UpdateChannelDto,
  ) {
    return this.channelsService.update(accountId, id, updateChannelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a channel' })
  @ApiNoContentResponse({
    description: 'Channel deleted successfully',
  })
  async remove(@Param('id') id: string) {
    await this.channelsService.remove(accountId, id);
  }
}
