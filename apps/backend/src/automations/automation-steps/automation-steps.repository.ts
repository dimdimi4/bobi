import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Automation, AutomationDocument } from '../schemas/automation.schema';
import { Step } from './schemas/step.schema';

@Injectable()
export class AutomationStepsRepository {
  constructor(
    @InjectModel(Automation.name)
    private readonly automationModel: Model<AutomationDocument>,
  ) {}

  private secureMatch(accountId: string, match?: FilterQuery<Automation>) {
    return { ...match, accountId };
  }

  async addStep(
    accountId: string,
    id: string,
    step: Partial<Step>,
  ): Promise<Automation | null> {
    return await this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: id }),
        { $push: { steps: step } },
        { new: true },
      )
      .exec();
  }

  async updateStep(
    accountId: string,
    id: string,
    stepId: string,
    step: Partial<Step>,
  ): Promise<Automation | null> {
    return await this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: id, 'steps._id': stepId }),
        { $set: { 'steps.$': step } },
        { new: true },
      )
      .exec();
  }

  async deleteStep(
    accountId: string,
    id: string,
    stepId: string,
  ): Promise<Automation | null> {
    return await this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: id, 'steps._id': stepId }),
        { $pull: { steps: { _id: stepId } } },
        { new: true },
      )
      .exec();
  }
}
