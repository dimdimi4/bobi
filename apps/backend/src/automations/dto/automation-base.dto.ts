import { AutomationStatus } from '../schemas/automation.schema';
import { Automation } from '../schemas/automation.schema';

export class AutomationBaseDto
  implements Pick<Automation, 'name' | 'status' | 'createdAt' | 'updatedAt'>
{
  id: string;
  name: string;
  status: AutomationStatus;
  createdAt: Date;
  updatedAt: Date;
}
