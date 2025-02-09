import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AutomationDto } from './dto/automation.dto';
import { Automation, AutomationDocument } from './schemas/automation.schema';

@Injectable()
export class AutomationsRepository {
  constructor(
    @InjectModel(Automation.name)
    private readonly automationModel: Model<AutomationDocument>,
  ) {}

  private toDto(document: AutomationDocument): AutomationDto {
    return plainToInstance(
      AutomationDto,
      { ...document.toObject(), id: document._id.toString() },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  private toEntities(documents: AutomationDocument[]): AutomationDto[] {
    return documents.map((doc) => this.toDto(doc));
  }

  async create(
    accountId: string,
    automation: Partial<Automation>,
  ): Promise<AutomationDto> {
    const createdAutomation = new this.automationModel({
      ...automation,
      accountId,
    });
    const savedAutomation = await createdAutomation.save();
    return this.toDto(savedAutomation);
  }

  async findById(accountId: string, id: string): Promise<AutomationDto | null> {
    const automation = await this.automationModel
      .findOne({ _id: id, accountId })
      .exec();
    return automation ? this.toDto(automation) : null;
  }

  async findPaginated(
    accountId: string,
    offset = 0,
    limit = 10,
  ): Promise<{
    total: number;
    limit: number;
    offset: number;
    results: AutomationDto[];
  }> {
    const [documents, total] = await Promise.all([
      this.automationModel.find({ accountId }).skip(offset).limit(limit).exec(),
      this.automationModel.countDocuments({ accountId }),
    ]);

    return {
      total,
      limit,
      offset,
      results: this.toEntities(documents),
    };
  }

  async update(
    accountId: string,
    id: string,
    automation: Partial<Automation>,
  ): Promise<AutomationDto | null> {
    const updatedAutomation = await this.automationModel
      .findOneAndUpdate({ _id: id, accountId }, automation, { new: true })
      .exec();
    return updatedAutomation ? this.toDto(updatedAutomation) : null;
  }

  async delete(accountId: string, id: string): Promise<AutomationDto | null> {
    const deletedAutomation = await this.automationModel
      .findOneAndDelete({ _id: id, accountId })
      .exec();
    return deletedAutomation ? this.toDto(deletedAutomation) : null;
  }
}
