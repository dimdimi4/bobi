import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { v7 as uuidv7 } from 'uuid';

import { AutomationsRepository } from './repositories/automation.repository';
import { AutomationVersionRepository } from './repositories/automation-version.repository';

import { Automation, AutomationDocument } from './schemas/automation.schema';

import { CreateAutomationDto } from './dto/create-automation.dto';
import { AutomationVersion } from './schemas/automation-version';
import { AutomationVersionDocument } from './schemas/automation-version';
import { PaginationQueryDto } from './dto/pagination.query.dto';
import { AutomationsPaginatedDto } from './dto/automations-paginated.dto';
import { UpdateAutomationDto } from './dto/update-automation.dto';
import { CreateStepDto } from './dto/create-step.dto';

@Injectable()
export class AutomationsService {
  constructor(
    private readonly automationsRepository: AutomationsRepository,
    private readonly automationVersionRepository: AutomationVersionRepository,
  ) {}

  private toAutomationEntity(automation: AutomationDocument): Automation {
    return plainToInstance(Automation, automation.toObject(), {
      enableImplicitConversion: true,
    });
  }

  private toAutomationVersionEntity(
    version: AutomationVersionDocument,
  ): AutomationVersion {
    return plainToInstance(AutomationVersion, version.toObject(), {
      enableImplicitConversion: true,
    });
  }

  private toAutomationEntities(
    automations: AutomationDocument[],
  ): Automation[] {
    return automations.map((m) => this.toAutomationEntity(m));
  }

  async create({
    accountId,
    createDto,
  }: {
    accountId: string;
    createDto: CreateAutomationDto;
  }) {
    const automationId = uuidv7();
    const versionId = uuidv7();

    const [automation, version] = await Promise.all([
      this.automationsRepository.create({
        accountId,
        automationId,
        name: createDto.name,
        draftVersion: versionId,
      }),
      this.automationVersionRepository.create({
        accountId,
        automationId,
        versionId,
        trigger: createDto.trigger,
      }),
    ]);

    return {
      automation: this.toAutomationEntity(automation),
      draftVersion: this.toAutomationVersionEntity(version),
    };
  }

  async listPaginated({
    accountId,
    query,
  }: {
    accountId: string;
    query: PaginationQueryDto;
  }): Promise<AutomationsPaginatedDto> {
    const offset = query.offset ?? 0;
    const limit = query.limit ?? 10;

    const [automations, total] = await Promise.all([
      this.automationsRepository.list({ accountId, offset, limit }),
      this.automationsRepository.totalCount({ accountId }),
    ]);

    return {
      total,
      offset,
      limit,
      results: this.toAutomationEntities(automations),
    };
  }

  async findOne({
    accountId,
    automationId,
  }: {
    accountId: string;
    automationId: string;
  }) {
    const automation = await this.automationsRepository.findOne({
      accountId,
      automationId,
    });

    if (!automation) {
      throw new NotFoundException('Automation not found');
    }

    const [currentVersion, draftVersion] = await Promise.all([
      automation.currentVersion
        ? this.automationVersionRepository.findOne({
            accountId,
            versionId: automation.currentVersion,
          })
        : null,
      automation.draftVersion
        ? this.automationVersionRepository.findOne({
            accountId,
            versionId: automation.draftVersion,
          })
        : null,
    ]);

    return {
      automation: this.toAutomationEntity(automation),
      currentVersion: currentVersion
        ? this.toAutomationVersionEntity(currentVersion)
        : null,
      draftVersion: draftVersion
        ? this.toAutomationVersionEntity(draftVersion)
        : null,
    };
  }

  async updateName({
    accountId,
    automationId,
    updateDto,
  }: {
    accountId: string;
    automationId: string;
    updateDto: UpdateAutomationDto;
  }) {
    const automation = await this.automationsRepository.setName({
      accountId,
      automationId,
      name: updateDto.name,
    });

    if (!automation) {
      throw new NotFoundException('Automation not found');
    }

    return this.toAutomationEntity(automation);
  }

  async discardDraft({
    accountId,
    automationId,
  }: {
    accountId: string;
    automationId: string;
  }) {
    const automation = await this.automationsRepository.findOne({
      accountId,
      automationId,
    });

    if (!automation) {
      throw new NotFoundException('Automation not found');
    }

    if (!automation.draftVersion) {
      throw new BadRequestException('No draft version to discard');
    }

    const [updatedAutomation] = await Promise.all([
      this.automationsRepository.unsetDraftVersion({
        accountId,
        automationId,
      }),
      this.automationVersionRepository.delete({
        accountId,
        versionId: automation.draftVersion,
      }),
    ]);

    if (!updatedAutomation) {
      throw new NotFoundException('Automation not found');
    }

    return this.toAutomationEntity(updatedAutomation);
  }

  async publishDraft({
    accountId,
    automationId,
  }: {
    accountId: string;
    automationId: string;
  }) {
    const automation = await this.automationsRepository.findOne({
      accountId,
      automationId,
    });

    if (!automation) {
      throw new NotFoundException('Automation not found');
    }

    if (!automation.draftVersion) {
      throw new BadRequestException('No draft version to publish');
    }

    const [updatedAutomation, currentVersion] = await Promise.all([
      this.automationsRepository.setCurrentVersion({
        accountId,
        automationId,
        currentVersion: automation.draftVersion,
      }),
      this.automationVersionRepository.publish({
        accountId,
        versionId: automation.draftVersion,
      }),
    ]);

    if (!updatedAutomation) {
      throw new NotFoundException('Automation not found');
    }

    return {
      automation: this.toAutomationEntity(updatedAutomation),
      currentVersion: currentVersion
        ? this.toAutomationVersionEntity(currentVersion)
        : null,
    };
  }

  async delete({
    accountId,
    automationId,
  }: {
    accountId: string;
    automationId: string;
  }) {
    const [automation] = await Promise.all([
      this.automationsRepository.delete({ accountId, automationId }),
      this.automationVersionRepository.deleteAll({ accountId, automationId }),
    ]);

    if (!automation) {
      throw new NotFoundException('Automation not found');
    }

    return;
  }

  private async fetchAutomationWithDraft({
    accountId,
    automationId,
  }: {
    accountId: string;
    automationId: string;
  }) {
    const automation = await this.automationsRepository.findOne({
      accountId,
      automationId,
    });

    if (!automation) {
      throw new NotFoundException('Automation not found');
    }

    if (automation.draftVersion) {
      const draftVersion = await this.automationVersionRepository.findOne({
        accountId,
        versionId: automation.draftVersion,
      });

      if (!draftVersion) {
        throw new NotFoundException('Draft version not found');
      }

      return {
        automation,
        draftVersion,
      };
    }

    const newDraftVersionId = uuidv7();

    if (!automation.currentVersion) {
      throw new BadRequestException('No current version to clone');
    }

    const [updatedAutomation, draftVersion] = await Promise.all([
      this.automationsRepository.setDraftVersion({
        accountId,
        automationId,
        draftVersion: automation.currentVersion,
      }),
      this.automationVersionRepository.clone({
        accountId,
        versionId: automation.currentVersion,
        newVersionId: newDraftVersionId,
      }),
    ]);

    if (!draftVersion) {
      throw new NotFoundException('Could not create draft version');
    }

    if (!updatedAutomation) {
      throw new NotFoundException(
        'Automation not found after draft version creation',
      );
    }

    return {
      automation: updatedAutomation,
      draftVersion,
    };
  }

  async createStep({
    accountId,
    automationId,
    createStepDto,
  }: {
    accountId: string;
    automationId: string;
    createStepDto: CreateStepDto;
  }) {
    const { automation, draftVersion } = await this.fetchAutomationWithDraft({
      accountId,
      automationId,
    });

    const newDraftVersion = await this.automationVersionRepository.createStep({
      accountId,
      versionId: draftVersion._id,
      step: createStepDto.step,
      connection: createStepDto.connection,
    });

    if (!newDraftVersion) {
      throw new NotFoundException('Could not create step');
    }

    return {
      automation: this.toAutomationEntity(automation),
      draftVersion: this.toAutomationVersionEntity(newDraftVersion),
    };
  }

  // async updateStepTask(
  //   accountId: string,
  //   id: string,
  //   stepId: string,
  //   task: AutomationTask,
  // ) {
  //   const automation = await this.automationsRepository.updateStepTask(
  //     accountId,
  //     id,
  //     stepId,
  //     task,
  //   );
  //   return this.toEntity(automation);
  // }

  // async bulkUpdateStepPositions(
  //   accountId: string,
  //   id: string,
  //   bulkUpdateStepPositionsDto: BulkUpdateStepPositionsDto,
  // ) {
  //   const automation = await this.automationsRepository.bulkUpdateStepPositions(
  //     accountId,
  //     id,
  //     bulkUpdateStepPositionsDto,
  //   );
  //   return this.toEntity(automation);
  // }

  // async deleteStep(accountId: string, id: string, stepId: string) {
  //   const automation = await this.automationsRepository.deleteStep(
  //     accountId,
  //     id,
  //     stepId,
  //   );
  //   return this.toEntity(automation);
  // }

  // async createConnection(
  //   accountId: string,
  //   id: string,
  //   connection: AutomationConnection,
  // ) {
  //   const automation = await this.automationsRepository.createConnection(
  //     accountId,
  //     id,
  //     connection,
  //   );
  //   return this.toEntity(automation);
  // }

  // async deleteConnection(accountId: string, id: string, connectionId: string) {
  //   const automation = await this.automationsRepository.deleteConnection(
  //     accountId,
  //     id,
  //     connectionId,
  //   );
  //   return this.toEntity(automation);
  // }
}
