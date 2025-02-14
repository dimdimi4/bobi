import { ClientSession, FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Automation, AutomationDocument } from '../schemas/automation.schema';

@Injectable()
export class AutomationsRepository {
  constructor(
    @InjectModel(Automation.name)
    private readonly automationModel: Model<AutomationDocument>,
  ) {}

  protected secureMatch(
    accountId: string,
    match?: FilterQuery<AutomationDocument>,
  ): FilterQuery<AutomationDocument> {
    return { ...match, accountId };
  }

  create(
    {
      accountId,
      automationId,
      name,
      draftVersionId,
    }: {
      accountId: string;
      automationId?: string;
    } & Pick<Automation, 'name' | 'draftVersionId'>,
    session?: ClientSession,
  ) {
    const createdAutomation = new this.automationModel({
      _id: automationId,
      accountId,
      name,
      draftVersionId,
    });
    return createdAutomation.save({ session });
  }

  findOne({
    accountId,
    automationId,
  }: {
    accountId: string;
    automationId: string;
  }) {
    return this.automationModel
      .findOne(this.secureMatch(accountId, { _id: automationId }))
      .exec();
  }

  list({
    accountId,
    offset,
    limit,
  }: {
    accountId: string;
    offset: number;
    limit: number;
  }) {
    return this.automationModel
      .find(this.secureMatch(accountId))
      .skip(offset)
      .limit(limit)
      .exec();
  }

  totalCount({ accountId }: { accountId: string }) {
    return this.automationModel.countDocuments(this.secureMatch(accountId));
  }

  setName(
    {
      accountId,
      automationId,
      name,
    }: {
      accountId: string;
      automationId: string;
    } & Partial<Pick<Automation, 'name'>>,
    session?: ClientSession,
  ) {
    return this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: automationId }),
        { $set: { name } },
        { new: true, session },
      )
      .exec();
  }

  setDraftVersion(
    {
      accountId,
      automationId,
      draftVersion,
    }: {
      accountId: string;
      automationId: string;
      draftVersion: string;
    },
    session?: ClientSession,
  ) {
    return this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: automationId }),
        { $set: { draftVersionId: draftVersion } },
        { new: true, session },
      )
      .exec();
  }

  unsetDraftVersion(
    {
      accountId,
      automationId,
    }: {
      accountId: string;
      automationId: string;
    },
    session?: ClientSession,
  ) {
    return this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: automationId }),
        { $unset: { draftVersionId: '' } },
        { new: true, session },
      )
      .exec();
  }

  setPublishedVersion(
    {
      accountId,
      automationId,
      publishedVersionId,
    }: {
      accountId: string;
      automationId: string;
      publishedVersionId: string;
    },
    session?: ClientSession,
  ) {
    return this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: automationId }),
        {
          $set: { publishedVersionId },
          $unset: { publishedVersionId: '' },
        },
        { new: true, session },
      )
      .exec();
  }

  setStatus(
    {
      accountId,
      automationId,
      status,
    }: {
      accountId: string;
      automationId: string;
    } & Pick<Automation, 'status'>,
    session?: ClientSession,
  ) {
    return this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: automationId }),
        { $set: { status } },
        { new: true, session },
      )
      .exec();
  }

  delete(
    {
      accountId,
      automationId,
    }: {
      accountId: string;
      automationId: string;
    },
    session?: ClientSession,
  ) {
    return this.automationModel
      .findOneAndDelete(this.secureMatch(accountId, { _id: automationId }), {
        session,
      })
      .exec();
  }
}
