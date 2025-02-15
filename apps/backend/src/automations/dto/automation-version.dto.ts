import { AutomationVersion } from '../schemas/automation-version.schema';

export class AutomationVersionDto
  implements Pick<AutomationVersion, 'publishedAt' | 'createdAt' | 'updatedAt'>
{
  id: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
