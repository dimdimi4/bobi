import { Automation } from '../schemas/automation.schema';

export class AutomationsPaginatedDto {
  total: number;
  limit: number;
  offset: number;
  results: Automation[];
}
