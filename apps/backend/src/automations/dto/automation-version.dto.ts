import { Type } from 'class-transformer';
import { AutomationVersion } from '../schemas/automation-version.schema';

export class AutomationVersionDto
  implements Pick<AutomationVersion, 'publishedAt' | 'createdAt' | 'updatedAt'>
{
  id: string;

  @Type(() => Date)
  publishedAt?: Date;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;
}
