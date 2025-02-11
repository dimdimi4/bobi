import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Automation, AutomationDocument } from './schemas/automation.schema';

import { PaginatedAutomationsDto } from './dto/paginated-automations.dto';
import { CreateAutomationDto } from './dto/create-automation.dto';
import { UpdateAutomationDto } from './dto/update-automation.dto';

@Injectable()
export class AutomationsRepository {
  constructor(
    @InjectModel(Automation.name)
    private readonly automationModel: Model<AutomationDocument>,
  ) {}

  private secureMatch(accountId: string, match?: FilterQuery<Automation>) {
    return { ...match, accountId };
  }

  async create(
    accountId: string,
    automationDto: CreateAutomationDto,
  ): Promise<Automation> {
    const createdAutomation = new this.automationModel({
      ...automationDto,
      accountId,
    });
    return await createdAutomation.save();
  }

  async findOne(accountId: string, id: string): Promise<Automation | null> {
    return await this.automationModel
      .findOne(this.secureMatch(accountId, { _id: id }))
      .exec();
  }

  async findPaginated(
    accountId: string,
    offset = 0,
    limit = 10,
  ): Promise<PaginatedAutomationsDto> {
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
      limit,
      offset,
      results: documents,
    };
  }

  async update(
    accountId: string,
    id: string,
    automationDto: UpdateAutomationDto,
  ): Promise<Automation | null> {
    return await this.automationModel
      .findOneAndUpdate(
        this.secureMatch(accountId, { _id: id }),
        automationDto,
        {
          new: true,
        },
      )
      .exec();
  }

  async delete(accountId: string, id: string): Promise<Automation | null> {
    return await this.automationModel
      .findOneAndDelete(this.secureMatch(accountId, { _id: id }))
      .exec();
  }
}
