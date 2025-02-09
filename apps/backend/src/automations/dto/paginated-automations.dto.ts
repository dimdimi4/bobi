import { ApiProperty } from '@nestjs/swagger';
import { PaginatedDto } from 'src/channels/dto/paginated.dto';
import { AutomationDto } from './automation.dto';

export class PaginatedAutomationsDto extends PaginatedDto {
  @ApiProperty({ type: [AutomationDto] })
  results: AutomationDto[];
}
