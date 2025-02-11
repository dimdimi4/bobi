import { Automation } from '../schemas/automation.schema';

export class PaginatedAutomationsDto {
  total: number;
  limit: number;
  offset: number;
  results: Automation[];
}
