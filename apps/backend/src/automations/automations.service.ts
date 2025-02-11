import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { AutomationsRepository } from './automations.repository';

import { Automation, AutomationDocument } from './schemas/automation.schema';

import {
  BulkUpdateStepPositionsDto,
  CreateConnectionDto,
  CreateStepDto,
  UpdateStepTaskDto,
} from './dto/steps.dto';
import { PaginationQueryDto } from './dto/pagination.query.dto';
import {
  AutomationsPaginatedDto,
  CreateAutomationDto,
  UpdateAutomationDto,
} from './dto/automation.dto';

@Injectable()
export class AutomationsService {
  constructor(private readonly automationsRepository: AutomationsRepository) {}

  private toEntity(automation: AutomationDocument | null): Automation {
    if (!automation) {
      throw new NotFoundException('Automation not found');
    }

    return plainToInstance(Automation, automation.toObject(), {
      enableImplicitConversion: true,
    });
  }

  private toEntities(automations: AutomationDocument[]): Automation[] {
    return automations.map((m) => this.toEntity(m));
  }

  async create(accountId: string, createAutomationDto: CreateAutomationDto) {
    const automation = await this.automationsRepository.create(
      accountId,
      createAutomationDto,
    );

    return this.toEntity(automation);
  }

  async findPaginated(
    accountId: string,
    query: PaginationQueryDto,
  ): Promise<AutomationsPaginatedDto> {
    const { total, offset, limit, results } =
      await this.automationsRepository.listPaginated(
        accountId,
        query.offset,
        query.limit,
      );

    return {
      total,
      offset,
      limit,
      results: this.toEntities(results),
    };
  }

  async findOne(accountId: string, id: string) {
    const automation = await this.automationsRepository.findOne(accountId, id);
    return this.toEntity(automation);
  }

  async update(
    accountId: string,
    id: string,
    updateAutomationDto: UpdateAutomationDto,
  ) {
    const automation = await this.automationsRepository.update(
      accountId,
      id,
      updateAutomationDto,
    );
    return this.toEntity(automation);
  }

  async delete(accountId: string, id: string) {
    const automation = await this.automationsRepository.delete(accountId, id);
    if (!automation) {
      throw new NotFoundException('Automation not found');
    }
    return this.toEntity(automation);
  }

  async addStep(accountId: string, id: string, createStepDto: CreateStepDto) {
    const automation = await this.automationsRepository.createStep(
      accountId,
      id,
      createStepDto,
    );
    return this.toEntity(automation);
  }

  async updateStepTask(
    accountId: string,
    id: string,
    stepId: string,
    task: UpdateStepTaskDto,
  ) {
    const automation = await this.automationsRepository.updateStepTask(
      accountId,
      id,
      stepId,
      task,
    );
    return this.toEntity(automation);
  }

  async bulkUpdateStepPositions(
    accountId: string,
    id: string,
    bulkUpdateStepPositionsDto: BulkUpdateStepPositionsDto,
  ) {
    const automation = await this.automationsRepository.bulkUpdateStepPositions(
      accountId,
      id,
      bulkUpdateStepPositionsDto,
    );
    return this.toEntity(automation);
  }

  async deleteStep(accountId: string, id: string, stepId: string) {
    const automation = await this.automationsRepository.deleteStep(
      accountId,
      id,
      stepId,
    );
    return this.toEntity(automation);
  }

  async createConnection(
    accountId: string,
    id: string,
    createConnectionDto: CreateConnectionDto,
  ) {
    const automation = await this.automationsRepository.createConnection(
      accountId,
      id,
      createConnectionDto,
    );
    return this.toEntity(automation);
  }

  async deleteConnection(accountId: string, id: string, connectionId: string) {
    const automation = await this.automationsRepository.deleteConnection(
      accountId,
      id,
      connectionId,
    );
    return this.toEntity(automation);
  }
}
