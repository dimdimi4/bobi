import { FilterQuery, Model } from 'mongoose';
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

  create({
    accountId,
    automationId,
    name,
    draftVersionId,
  }: {
    accountId: string;
    automationId?: string;
  } & Pick<Automation, 'name' | 'draftVersionId'>) {
    const createdAutomation = new this.automationModel({
      _id: automationId,
      accountId,
      name,
      draftVersionId,
    });
    return createdAutomation.save();
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

  setName({
    accountId,
    automationId,
    name,
  }: {
    accountId: string;
    automationId: string;
  } & Partial<Pick<Automation, 'name'>>) {
    return this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: automationId }),
        { $set: { name } },
        { new: true },
      )
      .exec();
  }

  setDraftVersion({
    accountId,
    automationId,
    draftVersion,
  }: {
    accountId: string;
    automationId: string;
    draftVersion: string;
  }) {
    return this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: automationId }),
        { $set: { draftVersionId: draftVersion } },
        { new: true },
      )
      .exec();
  }

  unsetDraftVersion({
    accountId,
    automationId,
  }: {
    accountId: string;
    automationId: string;
  }) {
    return this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: automationId }),
        { $unset: { draftVersionId: '' } },
        { new: true },
      )
      .exec();
  }

  setPublishedVersion({
    accountId,
    automationId,
    publishedVersionId,
  }: {
    accountId: string;
    automationId: string;
    publishedVersionId: string;
  }) {
    return this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: automationId }),
        {
          $set: { publishedVersionId },
          $unset: { publishedVersionId: '' },
        },
        { new: true },
      )
      .exec();
  }

  setStatus({
    accountId,
    automationId,
    status,
  }: {
    accountId: string;
    automationId: string;
  } & Pick<Automation, 'status'>) {
    return this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: automationId }),
        { $set: { status } },
        { new: true },
      )
      .exec();
  }

  delete({
    accountId,
    automationId,
  }: {
    accountId: string;
    automationId: string;
  }) {
    return this.automationModel
      .findOneAndDelete(this.secureMatch(accountId, { _id: automationId }))
      .exec();
  }
}
