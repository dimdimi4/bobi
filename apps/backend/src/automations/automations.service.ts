import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { v7 as uuidv7 } from 'uuid';
import { InjectConnection } from '@nestjs/mongoose';
import { ClientSession, Connection } from 'mongoose';

import { AutomationsRepository } from './repositories/automation.repository';
import { AutomationVersionRepository } from './repositories/automation-version.repository';

import {
  AutomationDocument,
  AutomationStatus,
} from './schemas/automation.schema';
import { AutomationVersionDocument } from './schemas/automation-version.schema';

import { AutomationTask } from './schemas/automation-tasks/automation-task.schema';
import { AutomationConnection } from './schemas/automation-connection.schema';
import { AutomationStep } from './schemas/automation-step.schema';

import { CreateAutomationDto } from './dto/create-automation.dto';
import { PaginationQueryDto } from './dto/pagination.query.dto';
import { AutomationsPaginatedDto } from './dto/automations-paginated.dto';
import { UpdateAutomationDto } from './dto/update-automation.dto';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepsPositionsDto } from './dto/bulk-update-step-positions.dto';
import { AutomationDto, AutomationVersionType } from './dto/automation.dto';
import { AutomationBaseDto } from './dto/automation-base.dto';
import {
  AutomationOverviewDto,
  AutomationVersionOverviewDto,
} from './dto/automation-overview.dto';

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

  private toAutomationDto(
    automation: AutomationDocument,
    version: AutomationVersionDocument,
  ): AutomationDto {
    const automationObj = automation.toObject();
    const versionObj = version.toObject();

    const versionType =
      automationObj.publishedVersionId === versionObj._id
        ? AutomationVersionType.MAIN
        : automationObj.draftVersionId === versionObj._id
          ? AutomationVersionType.DRAFT
          : AutomationVersionType.REVISION;

    const automationDto: AutomationDto = {
      id: automationObj._id,
      name: automationObj.name,
      status: automationObj.status,
      steps: versionObj.steps,
      connections: versionObj.connections,
      versionType,
      hasDraftVersion: Boolean(automationObj.draftVersionId),
      hasPublishedVersion: Boolean(automationObj.publishedVersionId),
      createdAt: automation.createdAt,
      updatedAt: versionObj.updatedAt || automation.updatedAt,
    };

    return plainToInstance(AutomationDto, automationDto, {
      enableCircularCheck: true,
    });
  }

  private toAutomationBaseDto(
    automation: AutomationDocument,
  ): AutomationBaseDto {
    const automationObj = automation.toObject();

    const automationBaseDto: AutomationBaseDto = {
      id: automationObj._id,
      name: automationObj.name,
      status: automationObj.status,
      createdAt: automationObj.createdAt,
      updatedAt: automationObj.updatedAt,
    };

    return plainToInstance(AutomationBaseDto, automationBaseDto, {
      enableCircularCheck: true,
    });
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

  private async fetchAutomationWithDraft(
    params: BaseAutomationParams,
    session?: ClientSession,
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

    const draftVersion = await this.automationVersionRepository.clone(
      {
        accountId: params.accountId,
        versionId: automation.publishedVersionId,
        newVersionId: newDraftVersionId,
      },
      session,
    );

    if (!draftVersion) {
      throw new NotFoundException('Could not create draft version');
    }

    const updatedAutomation = await this.automationsRepository.setDraftVersion(
      {
        accountId: params.accountId,
        automationId: params.automationId,
        draftVersion: draftVersion._id,
      },
      session,
    );

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
  }): Promise<AutomationDto> {
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
            ? this.createTriggerStep(createDto.trigger)
            : undefined,
        },
        session,
      );

      return this.toAutomationDto(automation, draftVersion);
    });
  }

  private createTriggerStep(
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
      results: automations.map((m) => this.toAutomationBaseDto(m)),
    };
  }

  async findOneForUpdate(params: BaseAutomationParams): Promise<AutomationDto> {
    const automation = await this.ensureAutomationExists(params);

    if (automation.draftVersionId) {
      const draftVersion = await this.automationVersionRepository.findOne({
        accountId: params.accountId,
        versionId: automation.draftVersionId,
      });

      if (draftVersion) {
        return this.toAutomationDto(automation, draftVersion);
      }
    }

    if (automation.publishedVersionId) {
      const publishedVersion = await this.automationVersionRepository.findOne({
        accountId: params.accountId,
        versionId: automation.publishedVersionId,
      });

      if (publishedVersion) {
        return this.toAutomationDto(automation, publishedVersion);
      }
    }

    throw new NotFoundException('No editable version found');
  }

  private toAutomationVersionOverviewDto(
    version: AutomationVersionDocument,
  ): AutomationVersionOverviewDto {
    const versionObj = version.toObject();
    const versionOverviewDto: AutomationVersionOverviewDto = {
      id: versionObj._id,
      createdAt: versionObj.createdAt,
      updatedAt: versionObj.updatedAt,
      steps: versionObj.steps,
      connections: versionObj.connections,
    };

    return plainToInstance(AutomationVersionOverviewDto, versionOverviewDto, {
      enableCircularCheck: true,
    });
  }

  private toAutomationOverviewDto(
    automation: AutomationDocument,
    publishedVersion: AutomationVersionDocument | null,
    draftVersion: AutomationVersionDocument | null,
  ): AutomationOverviewDto {
    const automationObj = automation.toObject();
    const automationOverviewDto: AutomationOverviewDto = {
      id: automationObj._id,
      name: automationObj.name,
      status: automationObj.status,
      createdAt: automationObj.createdAt,
      updatedAt: automationObj.updatedAt,
      publishedVersion: publishedVersion
        ? this.toAutomationVersionOverviewDto(publishedVersion)
        : undefined,
      draftVersion: draftVersion
        ? this.toAutomationVersionOverviewDto(draftVersion)
        : undefined,
    };

    return plainToInstance(AutomationOverviewDto, automationOverviewDto, {
      enableCircularCheck: true,
    });
  }

  async findOneOverview(
    params: BaseAutomationParams,
  ): Promise<AutomationOverviewDto> {
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

    return this.toAutomationOverviewDto(
      automation,
      publishedVersion,
      draftVersion,
    );
  }

  async update({
    accountId,
    automationId,
    updateDto,
  }: BaseAutomationParams & {
    updateDto: UpdateAutomationDto;
  }): Promise<AutomationBaseDto> {
    const automation = await this.automationsRepository.setName({
      accountId,
      automationId,
      name: updateDto.name,
    });

    if (!automation) {
      throw new NotFoundException('Automation not found');
    }

    return this.toAutomationBaseDto(automation);
  }

  private async returnPublishedAutomationDto({
    accountId,
    automation,
  }: {
    accountId: string;
    automation?: AutomationDocument | null;
  }): Promise<AutomationDto> {
    if (!automation) {
      throw new NotFoundException('Automation not found');
    }

    if (!automation.publishedVersionId) {
      throw new BadRequestException('Automation has no published version');
    }

    const publishedVersion = await this.automationVersionRepository.findOne({
      accountId,
      versionId: automation.publishedVersionId,
    });

    if (!publishedVersion) {
      throw new Error('Published version not found during activation');
    }

    return this.toAutomationDto(automation, publishedVersion);
  }

  async activate({
    accountId,
    automationId,
  }: BaseAutomationParams): Promise<AutomationDto> {
    const automation = await this.ensureAutomationExists({
      accountId,
      automationId,
    });

    if (!automation.publishedVersionId) {
      await this.publishDraft({
        accountId,
        automationId,
      });
    }

    const updatedAutomation = await this.automationsRepository.setStatus({
      accountId,
      automationId,
      status: AutomationStatus.ACTIVE,
    });

    return this.returnPublishedAutomationDto({
      accountId,
      automation: updatedAutomation,
    });
  }

  async deactivate({
    accountId,
    automationId,
  }: BaseAutomationParams): Promise<AutomationDto> {
    const updatedAutomation = await this.automationsRepository.setStatus({
      accountId,
      automationId,
      status: AutomationStatus.INACTIVE,
    });

    return this.returnPublishedAutomationDto({
      accountId,
      automation: updatedAutomation,
    });
  }

  async discardDraft(params: BaseAutomationParams): Promise<AutomationDto> {
    return this.withTransaction(async (session) => {
      const automation = await this.ensureAutomationExists(params);

      if (!automation.draftVersionId) {
        throw new BadRequestException('No draft version to discard');
      }

      await this.automationsRepository.unsetDraftVersion(
        {
          accountId: params.accountId,
          automationId: params.automationId,
        },
        session,
      );

      await this.automationVersionRepository.delete(
        {
          accountId: params.accountId,
          versionId: automation.draftVersionId,
        },
        session,
      );

      if (!automation.publishedVersionId) {
        throw new BadRequestException('No published version found');
      }

      const publishedVersion = await this.automationVersionRepository.findOne({
        accountId: params.accountId,
        versionId: automation.publishedVersionId,
      });

      if (!publishedVersion) {
        throw new NotFoundException('Published version not found');
      }

      return this.toAutomationDto(automation, publishedVersion);
    });
  }

  async publishDraft(params: BaseAutomationParams): Promise<AutomationDto> {
    return this.withTransaction(async (session) => {
      const automation = await this.ensureAutomationExists(params);

      if (!automation.draftVersionId) {
        throw new BadRequestException('No draft version to publish');
      }

      const updatedAutomation =
        await this.automationsRepository.setPublishedVersion(
          {
            accountId: params.accountId,
            automationId: params.automationId,
            publishedVersionId: automation.draftVersionId,
          },
          session,
        );

      const publishedVersion = await this.automationVersionRepository.publish(
        {
          accountId: params.accountId,
          versionId: automation.draftVersionId,
        },
        session,
      );

      if (updatedAutomation && publishedVersion) {
        return this.toAutomationDto(updatedAutomation, publishedVersion);
      }

      throw new NotFoundException('Could not publish draft version');
    });
  }

  async delete(params: BaseAutomationParams): Promise<void> {
    return this.withTransaction(async (session) => {
      await this.automationsRepository.delete(params, session);
      await this.automationVersionRepository.deleteAll(
        {
          accountId: params.accountId,
          automationId: params.automationId,
        },
        session,
      );
    });
  }

  async createStep({
    accountId,
    automationId,
    createStepDto,
  }: BaseAutomationParams & {
    createStepDto: CreateStepDto;
  }): Promise<AutomationDto> {
    return this.withTransaction(async (session) => {
      const { automation, draftVersion } = await this.fetchAutomationWithDraft(
        {
          accountId,
          automationId,
        },
        session,
      );

      const newDraftVersion = await this.automationVersionRepository.createStep(
        {
          accountId,
          versionId: draftVersion._id,
          step: createStepDto.step,
          connection: createStepDto.connection,
        },
        session,
      );

      if (newDraftVersion) {
        return this.toAutomationDto(automation, newDraftVersion);
      }

      throw new NotFoundException('Could not create step');
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
  }): Promise<AutomationDto> {
    return this.withTransaction(async (session) => {
      const { automation, draftVersion } = await this.fetchAutomationWithDraft(
        {
          accountId,
          automationId,
        },
        session,
      );

      const updatedDraftVersion =
        await this.automationVersionRepository.updateStepTask(
          {
            accountId,
            versionId: draftVersion._id,
            stepId,
            task,
          },
          session,
        );

      if (updatedDraftVersion) {
        return this.toAutomationDto(automation, updatedDraftVersion);
      }

      throw new NotFoundException('Could not update step task');
    });
  }

  async updateStepsPositions({
    accountId,
    automationId,
    stepPositions,
  }: BaseAutomationParams & {
    stepPositions: UpdateStepsPositionsDto;
  }): Promise<AutomationDto> {
    return this.withTransaction(async (session) => {
      const { automation, draftVersion } = await this.fetchAutomationWithDraft(
        {
          accountId,
          automationId,
        },
        session,
      );

      const updatedDraftVersion =
        await this.automationVersionRepository.updateStepsPositions(
          {
            accountId,
            versionId: draftVersion._id,
            stepPositions,
          },
          session,
        );

      if (updatedDraftVersion) {
        return this.toAutomationDto(automation, updatedDraftVersion);
      }

      throw new NotFoundException('Could not update step positions');
    });
  }

  async deleteSteps({
    accountId,
    automationId,
    stepIds,
  }: BaseAutomationParams & {
    stepIds: string[];
  }): Promise<AutomationDto> {
    return this.withTransaction(async (session) => {
      const { automation, draftVersion } = await this.fetchAutomationWithDraft(
        {
          accountId,
          automationId,
        },
        session,
      );

      const updatedDraftVersion =
        await this.automationVersionRepository.deleteSteps(
          {
            accountId,
            versionId: draftVersion._id,
            stepIds,
          },
          session,
        );

      if (updatedDraftVersion) {
        return this.toAutomationDto(automation, updatedDraftVersion);
      }

      throw new NotFoundException('Could not delete steps');
    });
  }

  async createConnection({
    accountId,
    automationId,
    connection,
  }: BaseAutomationParams & {
    connection: AutomationConnection;
  }): Promise<AutomationDto> {
    return this.withTransaction(async (session) => {
      const { automation, draftVersion } = await this.fetchAutomationWithDraft(
        {
          accountId,
          automationId,
        },
        session,
      );

      const updatedDraftVersion =
        await this.automationVersionRepository.createConnection(
          {
            accountId,
            versionId: draftVersion._id,
            connection,
          },
          session,
        );

      if (updatedDraftVersion) {
        return this.toAutomationDto(automation, updatedDraftVersion);
      }

      throw new NotFoundException('Could not create connection');
    });
  }

  async deleteConnections({
    accountId,
    automationId,
    connectionIds,
  }: BaseAutomationParams & {
    connectionIds: string[];
  }): Promise<AutomationDto> {
    return this.withTransaction(async (session) => {
      const { automation, draftVersion } = await this.fetchAutomationWithDraft(
        {
          accountId,
          automationId,
        },
        session,
      );

      const updatedDraftVersion =
        await this.automationVersionRepository.deleteConnections(
          {
            accountId,
            versionId: draftVersion._id,
            connectionIds,
          },
          session,
        );

      if (updatedDraftVersion) {
        return this.toAutomationDto(automation, updatedDraftVersion);
      }

      throw new NotFoundException('Could not delete connections');
    });
  }
}
