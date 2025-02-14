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
import {
  AutomationVersion,
  AutomationVersionDocument,
} from './schemas/automation-version.schema';
import { PaginationQueryDto } from './dto/pagination.query.dto';
import { AutomationsPaginatedDto } from './dto/automations-paginated.dto';
import { UpdateAutomationDto } from './dto/update-automation.dto';
import { CreateStepDto } from './dto/create-step.dto';
import { AutomationTask } from './schemas/automation-tasks.schema';
import { UpdateStepsPositionsDto } from './dto/bulk-update-step-positions.dto';
import { AutomationConnection } from './schemas/automation-connection.schema';
import { AutomationResponseDto } from './dto/automation-response.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { ClientSession, Connection } from 'mongoose';
import { AutomationStep } from './schemas/automation-step.schema';

// Common interfaces to reduce repetition
interface BaseAutomationParams {
  accountId: string;
  automationId: string;
}

interface AutomationWithVersion {
  automation: AutomationDocument;
  draftVersion: AutomationVersionDocument;
}

@Injectable()
export class AutomationsService {
  constructor(
    private readonly automationsRepository: AutomationsRepository,
    private readonly automationVersionRepository: AutomationVersionRepository,
    @InjectConnection() private readonly connection: Connection,
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

  private async ensureAutomationExists(
    params: BaseAutomationParams,
  ): Promise<AutomationDocument> {
    const automation = await this.automationsRepository.findOne(params);

    if (!automation) {
      throw new NotFoundException('Automation not found');
    }

    return automation;
  }

  private handleResponse({
    automation,
    draftVersion,
    publishedVersion,
  }: {
    automation: AutomationDocument;
    draftVersion?: AutomationVersionDocument | null;
    publishedVersion?: AutomationVersionDocument | null;
  }): AutomationResponseDto {
    return {
      automation: this.toAutomationEntity(automation),
      publishedVersion: publishedVersion
        ? this.toAutomationVersionEntity(publishedVersion)
        : undefined,
      draftVersion: draftVersion
        ? this.toAutomationVersionEntity(draftVersion)
        : undefined,
    };
  }

  private async fetchAutomationWithDraft(
    params: BaseAutomationParams,
  ): Promise<AutomationWithVersion> {
    const automation = await this.ensureAutomationExists(params);

    if (automation.draftVersionId) {
      const draftVersion = await this.automationVersionRepository.findOne({
        accountId: params.accountId,
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
        accountId: params.accountId,
        automationId: params.automationId,
        draftVersion: automation.publishedVersionId,
      }),
      this.automationVersionRepository.clone({
        accountId: params.accountId,
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

  private async withTransaction<T>(fn: (session: ClientSession) => Promise<T>) {
    const session = await this.connection.startSession();

    try {
      session.startTransaction();
      const result = await fn(session);
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }

  async create({
    accountId,
    createDto,
  }: {
    accountId: string;
    createDto: CreateAutomationDto;
  }): Promise<AutomationResponseDto> {
    return this.withTransaction(async (session) => {
      const automationId = uuidv7();
      const versionId = uuidv7();

      const automation = await this.automationsRepository.create(
        {
          accountId,
          automationId,
          name: createDto.name,
          draftVersionId: versionId,
        },
        session,
      );

      const draftVersion = await this.automationVersionRepository.create(
        {
          accountId,
          automationId,
          versionId,
          initStep: createDto.trigger
            ? this.createInitStep(createDto.trigger)
            : undefined,
        },
        session,
      );

      return this.handleResponse({
        automation,
        draftVersion,
      });
    });
  }

  private createInitStep(
    trigger: CreateAutomationDto['trigger'],
  ): AutomationStep {
    return {
      id: uuidv7(),
      position: { x: 100, y: 100 },
      task: {
        trigger_receivedMessage: trigger,
      },
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

  async findOne(params: BaseAutomationParams): Promise<AutomationResponseDto> {
    const automation = await this.ensureAutomationExists(params);

    const [publishedVersion, draftVersion] = await Promise.all([
      automation.publishedVersionId
        ? this.automationVersionRepository.findOne({
            accountId: params.accountId,
            versionId: automation.publishedVersionId,
          })
        : null,
      automation.draftVersionId
        ? this.automationVersionRepository.findOne({
            accountId: params.accountId,
            versionId: automation.draftVersionId,
          })
        : null,
    ]);

    return this.handleResponse({
      automation,
      publishedVersion,
      draftVersion,
    });
  }

  async update({
    accountId,
    automationId,
    updateDto,
  }: BaseAutomationParams & {
    updateDto: UpdateAutomationDto;
  }): Promise<AutomationResponseDto> {
    const automation = await this.automationsRepository.setName({
      accountId,
      automationId,
      name: updateDto.name,
    });

    if (!automation) {
      throw new NotFoundException('Automation not found');
    }

    return this.handleResponse({
      automation,
    });
  }

  async discardDraft(
    params: BaseAutomationParams,
  ): Promise<AutomationResponseDto> {
    const automation = await this.ensureAutomationExists(params);

    if (!automation.draftVersionId) {
      throw new BadRequestException('No draft version to discard');
    }

    const [updatedAutomation] = await Promise.all([
      this.automationsRepository.unsetDraftVersion({
        accountId: params.accountId,
        automationId: params.automationId,
      }),
      this.automationVersionRepository.delete({
        accountId: params.accountId,
        versionId: automation.draftVersionId,
      }),
    ]);

    if (!updatedAutomation) {
      throw new NotFoundException('Automation not found');
    }

    return this.handleResponse({
      automation: updatedAutomation,
    });
  }

  async publishDraft(
    params: BaseAutomationParams,
  ): Promise<AutomationResponseDto> {
    const automation = await this.ensureAutomationExists(params);

    if (!automation.draftVersionId) {
      throw new BadRequestException('No draft version to publish');
    }

    const [updatedAutomation, publishedVersion] = await Promise.all([
      this.automationsRepository.setPublishedVersion({
        accountId: params.accountId,
        automationId: params.automationId,
        publishedVersionId: automation.draftVersionId,
      }),
      this.automationVersionRepository.publish({
        accountId: params.accountId,
        versionId: automation.draftVersionId,
      }),
    ]);

    if (!updatedAutomation) {
      throw new NotFoundException('Could not publish draft version');
    }

    return this.handleResponse({
      automation: updatedAutomation,
      publishedVersion,
    });
  }

  async delete(params: BaseAutomationParams): Promise<void> {
    const [automation] = await Promise.all([
      this.automationsRepository.delete(params),
      this.automationVersionRepository.deleteAll({
        accountId: params.accountId,
        automationId: params.automationId,
      }),
    ]);

    if (!automation) {
      throw new NotFoundException('Automation not found');
    }

    return;
  }

  async createStep({
    accountId,
    automationId,
    createStepDto,
  }: BaseAutomationParams & {
    createStepDto: CreateStepDto;
  }): Promise<AutomationResponseDto> {
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

    return this.handleResponse({
      automation,
      draftVersion: newDraftVersion,
    });
  }

  async updateStepTask({
    accountId,
    automationId,
    stepId,
    task,
  }: BaseAutomationParams & {
    stepId: string;
    task: AutomationTask;
  }): Promise<AutomationResponseDto> {
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

    return this.handleResponse({
      automation,
      draftVersion: updatedDraftVersion,
    });
  }

  async updateStepsPositions({
    accountId,
    automationId,
    stepPositions,
  }: BaseAutomationParams & {
    stepPositions: UpdateStepsPositionsDto;
  }): Promise<AutomationResponseDto> {
    const { automation, draftVersion } = await this.fetchAutomationWithDraft({
      accountId,
      automationId,
    });

    const updatedDraftVersion =
      await this.automationVersionRepository.updateStepsPositions({
        accountId,
        versionId: draftVersion._id,
        stepPositions,
      });

    if (!updatedDraftVersion) {
      throw new NotFoundException('Could not update step positions');
    }

    return this.handleResponse({
      automation,
      draftVersion: updatedDraftVersion,
    });
  }

  async deleteStep({
    accountId,
    automationId,
    stepId,
  }: BaseAutomationParams & {
    stepId: string;
  }): Promise<AutomationResponseDto> {
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

    return this.handleResponse({
      automation,
      draftVersion: updatedDraftVersion,
    });
  }

  async createConnection({
    accountId,
    automationId,
    connection,
  }: BaseAutomationParams & {
    connection: AutomationConnection;
  }): Promise<AutomationResponseDto> {
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

    return this.handleResponse({
      automation,
      draftVersion: updatedDraftVersion,
    });
  }

  async deleteConnection({
    accountId,
    automationId,
    connectionId,
  }: BaseAutomationParams & {
    connectionId: string;
  }): Promise<AutomationResponseDto> {
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

    return this.handleResponse({
      automation,
      draftVersion: updatedDraftVersion,
    });
  }
}
