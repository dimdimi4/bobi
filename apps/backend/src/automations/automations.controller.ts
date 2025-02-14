import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AutomationsService } from './automations.service';

import { AutomationConnection } from './schemas/automation-connection.schema';
import { AutomationTask } from './schemas/automation-tasks.schema';

import { PaginationQueryDto } from './dto/pagination.query.dto';
import { CreateAutomationDto } from './dto/create-automation.dto';
import { BulkUpdateStepPositionsDto } from './dto/bulk-update-step-positions.dto';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateAutomationDto } from './dto/update-automation.dto';
import { AutomationResponseDto } from './dto/automation-response.dto';
import { AutomationsPaginatedDto } from './dto/automations-paginated.dto';

const accountId = '666666666666666666666666';

@ApiTags('Automations')
@Controller('automations')
export class AutomationsController {
  constructor(private readonly automationsService: AutomationsService) {}

  @Post()
  create(
    @Body() createDto: CreateAutomationDto,
  ): Promise<AutomationResponseDto> {
    return this.automationsService.create({ accountId, createDto });
  }

  @Get()
  findPaginated(
    @Query() query: PaginationQueryDto,
  ): Promise<AutomationsPaginatedDto> {
    return this.automationsService.listPaginated({ accountId, query });
  }

  @Get(':id')
  findOne(@Param('id') automationId: string): Promise<AutomationResponseDto> {
    return this.automationsService.findOne({ accountId, automationId });
  }

  @Patch(':id')
  update(
    @Param('id') automationId: string,
    @Body() updateDto: UpdateAutomationDto,
  ): Promise<AutomationResponseDto> {
    return this.automationsService.updateName({
      accountId,
      automationId,
      updateDto,
    });
  }

  @Delete(':id')
  async remove(@Param('id') automationId: string): Promise<void> {
    return this.automationsService.delete({ accountId, automationId });
  }

  @Post(':id/steps')
  createStep(
    @Param('id') automationId: string,
    @Body() createStepDto: CreateStepDto,
  ): Promise<AutomationResponseDto> {
    return this.automationsService.createStep({
      accountId,
      automationId,
      createStepDto,
    });
  }

  @Patch(':id/bulk-update-steps-positions')
  bulkUpdateStepsPositions(
    @Param('id') automationId: string,
    @Body() bulkUpdateStepsPositionsDto: BulkUpdateStepPositionsDto,
  ): Promise<AutomationResponseDto> {
    return this.automationsService.bulkUpdateStepsPositions({
      accountId,
      automationId,
      bulkUpdateStepsPositionsDto,
    });
  }

  @Patch(':id/steps/:stepId/task')
  updateStepTask(
    @Param('id') automationId: string,
    @Param('stepId') stepId: string,
    @Body() task: AutomationTask,
  ): Promise<AutomationResponseDto> {
    return this.automationsService.updateStepTask({
      accountId,
      automationId,
      stepId,
      task,
    });
  }

  @Delete(':id/steps/:stepId')
  deleteStep(
    @Param('id') automationId: string,
    @Param('stepId') stepId: string,
  ): Promise<AutomationResponseDto> {
    return this.automationsService.deleteStep({
      accountId,
      automationId,
      stepId,
    });
  }

  @Post(':id/connections')
  createConnection(
    @Param('id') automationId: string,
    @Body() connection: AutomationConnection,
  ): Promise<AutomationResponseDto> {
    return this.automationsService.createConnection({
      accountId,
      automationId,
      connection,
    });
  }

  @Delete(':id/connections/:connectionId')
  deleteConnection(
    @Param('id') automationId: string,
    @Param('connectionId') connectionId: string,
  ): Promise<AutomationResponseDto> {
    return this.automationsService.deleteConnection({
      accountId,
      automationId,
      connectionId,
    });
  }
}
