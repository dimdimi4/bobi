import { ClientSession, DeleteResult, FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  AutomationVersion,
  AutomationVersionDocument,
} from '../schemas/automation-version.schema';
import { AutomationStep } from '../schemas/automation-step.schema';
import { AutomationConnection } from '../schemas/automation-connection.schema';
import { AutomationTask } from '../schemas/automation-tasks.schema';

import { UpdateStepsPositionsDto } from '../dto/bulk-update-step-positions.dto';

@Injectable()
export class AutomationVersionRepository {
  constructor(
    @InjectModel(AutomationVersion.name)
    private readonly automationVersionModel: Model<AutomationVersionDocument>,
  ) {}

  private safeMatch(
    accountId: string,
    match?: FilterQuery<AutomationVersionDocument>,
  ): FilterQuery<AutomationVersionDocument> {
    return { ...match, accountId };
  }

  private versionMatch(
    accountId: string,
    versionId: string,
    match?: FilterQuery<AutomationVersionDocument>,
  ) {
    return this.safeMatch(accountId, {
      _id: versionId,
      ...match,
    });
  }

  create(
    {
      accountId,
      automationId,
      versionId,
      initStep,
    }: {
      accountId: string;
      automationId: string;
      versionId?: string;
      initStep?: AutomationStep;
    },
    session?: ClientSession,
  ) {
    const createdVersion = new this.automationVersionModel({
      _id: versionId,
      automationId,
      accountId,
    });

    if (initStep) {
      createdVersion.steps = [initStep];
    }

    return createdVersion.save({ session });
  }

  async clone(
    {
      accountId,
      versionId,
      newVersionId,
    }: {
      accountId: string;
      versionId: string;
      newVersionId?: string;
    },
    session?: ClientSession,
  ) {
    const existingVersion = await this.findOne({ accountId, versionId });

    if (!existingVersion) {
      return null;
    }

    const clonedVersion = new this.automationVersionModel({
      _id: newVersionId,
      accountId: existingVersion.accountId,
      automationId: existingVersion.automationId,
      steps: existingVersion.steps,
      connections: existingVersion.connections,
    });

    return clonedVersion.save({ session });
  }

  findOne({ accountId, versionId }: { accountId: string; versionId: string }) {
    return this.automationVersionModel
      .findOne(this.versionMatch(accountId, versionId))
      .exec();
  }

  publish(
    { accountId, versionId }: { accountId: string; versionId: string },
    session?: ClientSession,
  ) {
    return this.automationVersionModel
      .findOneAndUpdate(
        this.versionMatch(accountId, versionId),
        {
          publishedAt: new Date(),
        },
        {
          new: true,
          session,
        },
      )
      .exec();
  }

  delete(
    { accountId, versionId }: { accountId: string; versionId: string },
    session?: ClientSession,
  ) {
    return this.automationVersionModel
      .findOneAndDelete(this.versionMatch(accountId, versionId), {
        session,
      })
      .exec();
  }

  deleteAll(
    {
      accountId,
      automationId,
    }: {
      accountId: string;
      automationId: string;
    },
    session?: ClientSession,
  ): Promise<DeleteResult> {
    return this.automationVersionModel
      .deleteMany(this.safeMatch(accountId, { automationId }), {
        session,
      })
      .exec();
  }

  createStep(
    {
      accountId,
      versionId,
      step,
      connection,
    }: {
      accountId: string;
      versionId: string;
      step: AutomationStep;
      connection?: AutomationConnection;
    },
    session?: ClientSession,
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

    return this.automationVersionModel
      .findOneAndUpdate(
        this.versionMatch(accountId, versionId),
        { $push: pushFields },
        { new: true, session },
      )
      .exec();
  }

  updateStepTask(
    {
      accountId,
      versionId,
      stepId,
      task,
    }: {
      accountId: string;
      versionId: string;
      stepId: string;
      task: AutomationTask;
    },
    session?: ClientSession,
  ) {
    return this.automationVersionModel
      .findOneAndUpdate(
        this.versionMatch(accountId, versionId, { 'steps.id': stepId }),
        { $set: { 'steps.$.task': task } },
        { new: true, session },
      )
      .exec();
  }

  updateStepsPositions(
    {
      accountId,
      versionId,
      stepPositions,
    }: {
      accountId: string;
      versionId: string;
      stepPositions: UpdateStepsPositionsDto;
    },
    session?: ClientSession,
  ) {
    const updates: Record<string, unknown> = {};
    stepPositions.steps.forEach(({ stepId, position }) => {
      updates[`steps.$[elem${stepId}].position`] = position;
    });

    return this.automationVersionModel.findOneAndUpdate(
      this.versionMatch(accountId, versionId),
      { $set: updates },
      {
        arrayFilters: stepPositions.steps.map(({ stepId }) => ({
          [`elem${stepId}.id`]: stepId,
        })),
        new: true,
        session,
      },
    );
  }

  deleteStep(
    {
      accountId,
      versionId,
      stepId,
    }: {
      accountId: string;
      versionId: string;
      stepId: string;
    },
    session?: ClientSession,
  ) {
    return this.automationVersionModel
      .findOneAndUpdate(
        this.versionMatch(accountId, versionId, { 'steps.id': stepId }),
        {
          $pull: {
            steps: { id: stepId },
            connections: {
              $or: [{ sourceStepId: stepId }, { targetStepId: stepId }],
            },
          },
        },
        { new: true, session },
      )
      .exec();
  }

  createConnection(
    {
      accountId,
      versionId,
      connection,
    }: {
      accountId: string;
      versionId: string;
      connection: AutomationConnection;
    },
    session?: ClientSession,
  ) {
    return this.automationVersionModel.findOneAndUpdate(
      this.versionMatch(accountId, versionId),
      { $push: { connections: connection } },
      { new: true, session },
    );
  }

  deleteConnection(
    {
      accountId,
      versionId,
      connectionId,
    }: {
      accountId: string;
      versionId: string;
      connectionId: string;
    },
    session?: ClientSession,
  ) {
    return this.automationVersionModel.findOneAndUpdate(
      this.versionMatch(accountId, versionId),
      { $pull: { connections: { id: connectionId } } },
      { new: true, session },
    );
  }
}
