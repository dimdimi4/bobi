import { IsString } from 'class-validator';
import { AutomationDto } from './automation.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAutomationDto implements Pick<AutomationDto, 'name'> {
  @ApiProperty()
  @IsString()
  name: string;
}
