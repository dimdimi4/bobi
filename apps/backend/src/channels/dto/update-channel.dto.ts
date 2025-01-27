import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateChannelDto } from './create-channel.dto';

export class UpdateChannelDto extends PartialType(
  OmitType(CreateChannelDto, ['type'] as const),
) {}
