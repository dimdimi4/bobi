import { AutomationBaseDto } from './automation-base.dto';

export class AutomationsPaginatedDto {
  total: number;
  limit: number;
  offset: number;
  results: AutomationBaseDto[];
}
