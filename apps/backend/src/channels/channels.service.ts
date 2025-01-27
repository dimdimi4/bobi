import { Injectable, NotFoundException } from '@nestjs/common';
import { ChannelsRepository } from './channels.repository';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelsService {
  constructor(private readonly channelsRepository: ChannelsRepository) {}

  async create(accountId: string, createChannelDto: CreateChannelDto) {
    return this.channelsRepository.create(accountId, createChannelDto);
  }

  async findPaginated(accountId: string, offset = 0, limit = 10) {
    return this.channelsRepository.findPaginated(accountId, offset, limit);
  }

  async findOne(accountId: string, id: string) {
    const channel = await this.channelsRepository.findById(accountId, id);

    if (!channel) {
      throw new NotFoundException('Channel not found');
    }

    return channel;
  }

  async update(
    accountId: string,
    id: string,
    updateChannelDto: UpdateChannelDto,
  ) {
    const updated = await this.channelsRepository.update(
      accountId,
      id,
      updateChannelDto,
    );

    if (!updated) {
      throw new NotFoundException('Channel not found');
    }

    return updated;
  }

  async remove(accountId: string, id: string) {
    return this.channelsRepository.delete(accountId, id);
  }
}
