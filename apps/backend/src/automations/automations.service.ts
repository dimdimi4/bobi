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

import { AutomationDocument } from './schemas/automation.schema';
import { AutomationVersionDocument } from './schemas/automation-version.schema';

import { AutomationTask } from './schemas/automation-tasks.schema';
import { AutomationConnection } from './schemas/automation-connection.schema';
import { AutomationStep } from './schemas/automation-step.schema';

import { CreateAutomationDto } from './dto/create-automation.dto';
import { PaginationQueryDto } from './dto/pagination.query.dto';
import { AutomationsPaginatedDto } from './dto/automations-paginated.dto';
import { UpdateAutomationDto } from './dto/update-automation.dto';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepsPositionsDto } from './dto/bulk-update-step-positions.dto';
import { AutomationDto } from './dto/automation.dto';
import { AutomationVersionDto } from './dto/automation-version.dto';
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

  private toAutomationVersionDto(
    version: AutomationVersionDocument,
  ): AutomationVersionDto {
    const versionDto: AutomationVersionDto = {
      id: version._id,
      createdAt: version.createdAt,
      updatedAt: version.updatedAt,
      publishedAt: version.publishedAt,
    };

    return plainToInstance(AutomationVersionDto, versionDto);
  }

  private toAutomationDto(
    automation: AutomationDocument,
    version: AutomationVersionDocument,
  ): AutomationDto {
    const automationDto: AutomationDto = {
      id: automation._id,
      name: automation.name,
      status: automation.status,
      steps: version.steps,
      connections: version.connections,
      version: this.toAutomationVersionDto(version),
      createdAt: automation.createdAt,
      updatedAt: automation.updatedAt,
    };

    return plainToInstance(AutomationDto, automationDto);
  }

  private toAutomationBaseDto(
    automation: AutomationDocument,
  ): AutomationBaseDto {
    const automationBaseDto: AutomationBaseDto = {
      id: automation._id,
      name: automation.name,
      status: automation.status,
      createdAt: automation.createdAt,
      updatedAt: automation.updatedAt,
    };

    return plainToInstance(AutomationBaseDto, automationBaseDto);
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

    const updatedAutomation = await this.automationsRepository.setDraftVersion(
      {
        accountId: params.accountId,
        automationId: params.automationId,
        draftVersion: automation.publishedVersionId,
      },
      session,
    );

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
    const versionOverviewDto: AutomationVersionOverviewDto = {
      id: version._id,
      createdAt: version.createdAt,
      updatedAt: version.updatedAt,
      steps: version.steps,
      connections: version.connections,
    };

    return plainToInstance(AutomationVersionOverviewDto, versionOverviewDto);
  }

  private toAutomationOverviewDto(
    automation: AutomationDocument,
    publishedVersion: AutomationVersionDocument | null,
    draftVersion: AutomationVersionDocument | null,
  ): AutomationOverviewDto {
    const automationOverviewDto: AutomationOverviewDto = {
      id: automation._id,
      name: automation.name,
      status: automation.status,
      createdAt: automation.createdAt,
      updatedAt: automation.updatedAt,
      publishedVersion: publishedVersion
        ? this.toAutomationVersionOverviewDto(publishedVersion)
        : undefined,
      draftVersion: draftVersion
        ? this.toAutomationVersionOverviewDto(draftVersion)
        : undefined,
    };

    return plainToInstance(AutomationOverviewDto, automationOverviewDto);
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

  async deleteStep({
    accountId,
    automationId,
    stepId,
  }: BaseAutomationParams & {
    stepId: string;
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
        await this.automationVersionRepository.deleteStep(
          {
            accountId,
            versionId: draftVersion._id,
            stepId,
          },
          session,
        );

      if (updatedDraftVersion) {
        return this.toAutomationDto(automation, updatedDraftVersion);
      }

      throw new NotFoundException('Could not delete step');
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

  async deleteConnection({
    accountId,
    automationId,
    connectionId,
  }: BaseAutomationParams & {
    connectionId: string;
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
        await this.automationVersionRepository.deleteConnection(
          {
            accountId,
            versionId: draftVersion._id,
            connectionId,
          },
          session,
        );

      if (updatedDraftVersion) {
        return this.toAutomationDto(automation, updatedDraftVersion);
      }

      throw new NotFoundException('Could not delete connection');
    });
  }
}
