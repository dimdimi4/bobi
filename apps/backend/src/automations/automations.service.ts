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
import { AutomationTask } from './schemas/automation-tasks.schema';
import { BulkUpdateStepPositionsDto } from './dto/bulk-update-step-positions.dto';
import { AutomationConnection } from './schemas/automation-connection.schema';

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
        draftVersionId: versionId,
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
      automation.publishedVersionId
        ? this.automationVersionRepository.findOne({
            accountId,
            versionId: automation.publishedVersionId,
          })
        : null,
      automation.draftVersionId
        ? this.automationVersionRepository.findOne({
            accountId,
            versionId: automation.draftVersionId,
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

    if (!automation.draftVersionId) {
      throw new BadRequestException('No draft version to discard');
    }

    const [updatedAutomation] = await Promise.all([
      this.automationsRepository.unsetDraftVersion({
        accountId,
        automationId,
      }),
      this.automationVersionRepository.delete({
        accountId,
        versionId: automation.draftVersionId,
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

    if (!automation.draftVersionId) {
      throw new BadRequestException('No draft version to publish');
    }

    const [updatedAutomation, currentVersion] = await Promise.all([
      this.automationsRepository.setPublishedVersion({
        accountId,
        automationId,
        publishedVersionId: automation.draftVersionId,
      }),
      this.automationVersionRepository.publish({
        accountId,
        versionId: automation.draftVersionId,
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

    if (automation.draftVersionId) {
      const draftVersion = await this.automationVersionRepository.findOne({
        accountId,
        versionId: automation.draftVersionId,
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

    if (!automation.publishedVersionId) {
      throw new BadRequestException('No current version to clone');
    }

    const [updatedAutomation, draftVersion] = await Promise.all([
      this.automationsRepository.setDraftVersion({
        accountId,
        automationId,
        draftVersion: automation.publishedVersionId,
      }),
      this.automationVersionRepository.clone({
        accountId,
        versionId: automation.publishedVersionId,
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

  async updateStepTask({
    accountId,
    automationId,
    stepId,
    task,
  }: {
    accountId: string;
    automationId: string;
    stepId: string;
    task: AutomationTask;
  }) {
    const { automation, draftVersion } = await this.fetchAutomationWithDraft({
      accountId,
      automationId,
    });

    const updatedDraftVersion =
      await this.automationVersionRepository.updateStepTask({
        accountId,
        versionId: draftVersion._id,
        stepId,
        task: task,
      });

    if (!updatedDraftVersion) {
      throw new NotFoundException('Could not update step task');
    }

    return {
      automation: this.toAutomationEntity(automation),
      draftVersion: this.toAutomationVersionEntity(updatedDraftVersion),
    };
  }

  async bulkUpdateStepPositions({
    accountId,
    automationId,
    bulkUpdateStepPositionsDto,
  }: {
    accountId: string;
    automationId: string;
    bulkUpdateStepPositionsDto: BulkUpdateStepPositionsDto;
  }) {
    const { automation, draftVersion } = await this.fetchAutomationWithDraft({
      accountId,
      automationId,
    });

    const updatedDraftVersion =
      await this.automationVersionRepository.bulkUpdateStepPositions({
        accountId,
        versionId: draftVersion._id,
        stepPositions: bulkUpdateStepPositionsDto,
      });

    if (!updatedDraftVersion) {
      throw new NotFoundException('Could not update step positions');
    }

    return {
      automation: this.toAutomationEntity(automation),
      draftVersion: this.toAutomationVersionEntity(updatedDraftVersion),
    };
  }

  async deleteStep({
    accountId,
    automationId,
    stepId,
  }: {
    accountId: string;
    automationId: string;
    stepId: string;
  }) {
    const { automation, draftVersion } = await this.fetchAutomationWithDraft({
      accountId,
      automationId,
    });

    const updatedDraftVersion =
      await this.automationVersionRepository.deleteStep({
        accountId,
        versionId: draftVersion._id,
        stepId,
      });

    if (!updatedDraftVersion) {
      throw new NotFoundException('Could not delete step');
    }

    return {
      automation: this.toAutomationEntity(automation),
      draftVersion: this.toAutomationVersionEntity(updatedDraftVersion),
    };
  }

  async createConnection({
    accountId,
    automationId,
    connection,
  }: {
    accountId: string;
    automationId: string;
    connection: AutomationConnection;
  }) {
    const { automation, draftVersion } = await this.fetchAutomationWithDraft({
      accountId,
      automationId,
    });

    const updatedDraftVersion =
      await this.automationVersionRepository.createConnection({
        accountId,
        versionId: draftVersion._id,
        connection,
      });

    if (!updatedDraftVersion) {
      throw new NotFoundException('Could not create connection');
    }

    return {
      automation: this.toAutomationEntity(automation),
      draftVersion: this.toAutomationVersionEntity(updatedDraftVersion),
    };
  }

  async deleteConnection({
    accountId,
    automationId,
    connectionId,
  }: {
    accountId: string;
    automationId: string;
    connectionId: string;
  }) {
    const { automation, draftVersion } = await this.fetchAutomationWithDraft({
      accountId,
      automationId,
    });

    const updatedDraftVersion =
      await this.automationVersionRepository.deleteConnection({
        accountId,
        versionId: draftVersion._id,
        connectionId,
      });

    if (!updatedDraftVersion) {
      throw new NotFoundException('Could not delete connection');
    }

    return {
      automation: this.toAutomationEntity(automation),
      draftVersion: this.toAutomationVersionEntity(updatedDraftVersion),
    };
  }
}
