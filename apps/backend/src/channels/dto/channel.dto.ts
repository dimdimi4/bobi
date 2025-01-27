import { Exclude, Expose } from 'class-transformer';
import { Channel, ChannelDocument } from '../schemas/channel.schema';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ChannelDto implements Channel {
  accountId: string;
  token: string;

  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  type: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  createdAt: string;

  @Expose()
  @ApiProperty()
  updatedAt: string;

  constructor(partial: ChannelDocument) {
    Object.assign(this, partial.toJSON());
    this.id = partial._id.toString();
  }
}
