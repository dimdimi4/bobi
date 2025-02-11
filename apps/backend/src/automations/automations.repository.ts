import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  Automation,
  AutomationDocument,
  AutomationStep,
  AutomationConnection,
} from './schemas/automation.schema';
import { AutomationTask } from './schemas/automation-tasks.schema';
import { MutateAutomationDto } from './dto/mutate-automation.dto';
import { BulkUpdateStepPositionsDto } from './dto/bulk-update-step-positions.dto';

@Injectable()
export class AutomationsRepository {
  constructor(
    @InjectModel(Automation.name)
    private readonly automationModel: Model<AutomationDocument>,
  ) {}

  private secureMatch(
    accountId: string,
    match?: FilterQuery<AutomationDocument>,
  ): FilterQuery<AutomationDocument> {
    return { ...match, accountId };
  }

  create(accountId: string, automationDto: MutateAutomationDto) {
    const createdAutomation = new this.automationModel({
      name: automationDto.name,
      accountId,
    });
    return createdAutomation.save();
  }

  findOne(accountId: string, id: string) {
    return this.automationModel
      .findOne(this.secureMatch(accountId, { _id: id }))
      .exec();
  }

  async listPaginated(accountId: string, offset = 0, limit = 10) {
    const [documents, total] = await Promise.all([
      this.automationModel
        .find(this.secureMatch(accountId))
        .skip(offset)
        .limit(limit)
        .exec(),
      this.automationModel.countDocuments(this.secureMatch(accountId)),
    ]);

    return {
      total,
      offset,
      limit,
      results: documents,
    };
  }

  update(accountId: string, id: string, automationDto: MutateAutomationDto) {
    return this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: id }),
        { $set: automationDto },
        {
          new: true,
        },
      )
      .exec();
  }

  delete(accountId: string, id: string) {
    return this.automationModel
      .findOneAndDelete(this.secureMatch(accountId, { _id: id }))
      .exec();
  }

  createStep(
    accountId: string,
    id: string,
    {
      step,
      connection,
    }: { step: AutomationStep; connection?: AutomationConnection },
  ) {
    const pushFields: {
      steps: AutomationStep;
      connections?: AutomationConnection;
    } = {
      steps: step,
    };

    if (connection) {
      pushFields.connections = connection;
    }

    return this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: id }),
        { $push: pushFields },
        { new: true },
      )
      .exec();
  }

  updateStepTask(
    accountId: string,
    id: string,
    stepId: string,
    task: AutomationTask,
  ) {
    return this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: id, 'steps.id': stepId }),
        { $set: { 'steps.$.task': task } },
        { new: true },
      )
      .exec();
  }

  bulkUpdateStepPositions(
    accountId: string,
    id: string,
    stepPositions: BulkUpdateStepPositionsDto,
  ) {
    const updates: Record<string, unknown> = {};
    stepPositions.steps.forEach(({ stepId, position }) => {
      updates[`steps.$[elem${stepId}].position`] = position;
    });

    return this.automationModel.findOneAndUpdate(
      this.secureMatch(accountId, { _id: id }),
      { $set: updates },
      {
        arrayFilters: stepPositions.steps.map(({ stepId }) => ({
          [`elem${stepId}.id`]: stepId,
        })),
        new: true,
      },
    );
  }

  deleteStep(accountId: string, id: string, stepId: string) {
    return this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: id, 'steps.id': stepId }),
        {
          $pull: {
            steps: { id: stepId },
            connections: {
              $or: [{ sourceStepId: stepId }, { targetStepId: stepId }],
            },
          },
        },
        { new: true },
      )
      .exec();
  }

  createConnection(
    accountId: string,
    id: string,
    connection: AutomationConnection,
  ) {
    return this.automationModel.findOneAndUpdate(
      this.secureMatch(accountId, { _id: id }),
      { $push: { connections: connection } },
      { new: true },
    );
  }

  deleteConnection(accountId: string, id: string, connectionId: string) {
    return this.automationModel.findOneAndUpdate(
      this.secureMatch(accountId, { _id: id }),
      { $pull: { connections: { id: connectionId } } },
      { new: true },
    );
  }
}
