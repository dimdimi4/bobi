import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';

import { ChannelDto } from './dto/channel.dto';
import { Channel, ChannelDocument } from './schemas/channel.schema';
import { PaginatedChannelsDto } from './dto/paginated-channels.dto';

@Injectable()
export class ChannelsRepository {
  constructor(
    @InjectModel(Channel.name)
    private readonly channelModel: Model<ChannelDocument>,
  ) {}

  private toDto(document: ChannelDocument): ChannelDto {
    return new ChannelDto(document);
  }

  private toEntities(documents: ChannelDocument[]): ChannelDto[] {
    return documents.map((doc) => this.toDto(doc));
  }

  async isTokenUnique(token: string, excludeId?: string): Promise<boolean> {
    const query = { token };
    if (excludeId) {
      Object.assign(query, { _id: { $ne: excludeId } });
    }
    const existingChannel = await this.channelModel.findOne(query).exec();
    return !existingChannel;
  }

  async create(
    accountId: string,
    channel: Partial<Channel>,
  ): Promise<ChannelDto> {
    if (!channel.token) {
      throw new BadRequestException('Channel token is required');
    }

    const isUnique = await this.isTokenUnique(channel.token);
    if (!isUnique) {
      throw new BadRequestException('Channel with this token already exists');
    }

    const createdChannel = new this.channelModel({
      ...channel,
      accountId,
    });
    const savedChannel = await createdChannel.save();
    return this.toDto(savedChannel);
  }

  async findById(accountId: string, id: string): Promise<ChannelDto | null> {
    const channel = await this.channelModel
      .findOne({ _id: id, accountId })
      .exec();
    return channel ? this.toDto(channel) : null;
  }

  async findPaginated(
    accountId: string,
    offset = 0,
    limit = 10,
  ): Promise<PaginatedChannelsDto> {
    const [documents, total] = await Promise.all([
      this.channelModel.find({ accountId }).skip(offset).limit(limit).exec(),
      this.channelModel.countDocuments({ accountId }),
    ]);

    return {
      total,
      limit,
      offset,
      results: this.toEntities(documents),
    };
  }

  async update(
    accountId: string,
    id: string,
    channel: Partial<Channel>,
  ): Promise<ChannelDto | null> {
    if (channel.token) {
      const isUnique = await this.isTokenUnique(channel.token, id);
      if (!isUnique) {
        throw new BadRequestException('Channel with this token already exists');
      }
    }

    const updated = await this.channelModel
      .findOneAndUpdate({ _id: id, accountId }, channel, { new: true })
      .exec();

    return updated ? this.toDto(updated) : null;
  }

  async delete(accountId: string, id: string): Promise<ChannelDto | null> {
    const deleted = await this.channelModel
      .findOneAndDelete({ _id: id, accountId })
      .exec();

    return deleted ? this.toDto(deleted) : null;
  }
}
