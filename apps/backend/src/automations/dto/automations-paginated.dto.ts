import { Type } from 'class-transformer';
import { AutomationBaseDto } from './automation-base.dto';
export class AutomationsPaginatedDto {
  total: number;
  limit: number;
  offset: number;

  @Type(() => AutomationBaseDto)
  results: AutomationBaseDto[];
}
