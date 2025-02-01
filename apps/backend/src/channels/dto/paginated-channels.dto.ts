import { ApiProperty } from '@nestjs/swagger';
import { ChannelDto } from './channel.dto';
import { PaginatedDto } from './paginated.dto';

export class PaginatedChannelsDto extends PaginatedDto {
  @ApiProperty({ type: [ChannelDto] })
  results: ChannelDto[];
}
