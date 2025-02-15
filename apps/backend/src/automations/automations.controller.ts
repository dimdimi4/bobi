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
import { AutomationTask } from './schemas/automation-tasks/automation-task.schema';

import { PaginationQueryDto } from './dto/pagination.query.dto';
import { CreateAutomationDto } from './dto/create-automation.dto';
import { UpdateStepsPositionsDto } from './dto/bulk-update-step-positions.dto';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateAutomationDto } from './dto/update-automation.dto';
import { AutomationsPaginatedDto } from './dto/automations-paginated.dto';
import { AutomationDto } from './dto/automation.dto';
import { AutomationOverviewDto } from './dto/automation-overview.dto';
import { AutomationBaseDto } from './dto/automation-base.dto';
import { DeleteStepsDto } from './dto/delete-steps.dto';
import { DeleteConnectionsDto } from './dto/delete-connections.dto';

const accountId = '666666666666666666666666';

@ApiTags('Automations')
@Controller('automations')
export class AutomationsController {
  constructor(private readonly automationsService: AutomationsService) {}

  @Post()
  create(@Body() createDto: CreateAutomationDto): Promise<AutomationDto> {
    return this.automationsService.create({ accountId, createDto });
  }

  @Get()
  listPaginated(
    @Query() query: PaginationQueryDto,
  ): Promise<AutomationsPaginatedDto> {
    return this.automationsService.listPaginated({ accountId, query });
  }

  @Get(':id')
  findOneForUpdate(@Param('id') automationId: string): Promise<AutomationDto> {
    return this.automationsService.findOneForUpdate({
      accountId,
      automationId,
    });
  }

  @Get(':id/overview')
  findOneOverview(
    @Param('id') automationId: string,
  ): Promise<AutomationOverviewDto> {
    return this.automationsService.findOneOverview({
      accountId,
      automationId,
    });
  }

  @Patch(':id')
  update(
    @Param('id') automationId: string,
    @Body() updateDto: UpdateAutomationDto,
  ): Promise<AutomationBaseDto> {
    return this.automationsService.update({
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
  ): Promise<AutomationDto> {
    return this.automationsService.createStep({
      accountId,
      automationId,
      createStepDto,
    });
  }

  @Patch(':id/update-steps-positions')
  updateStepsPositions(
    @Param('id') automationId: string,
    @Body() stepPositions: UpdateStepsPositionsDto,
  ): Promise<AutomationDto> {
    return this.automationsService.updateStepsPositions({
      accountId,
      automationId,
      stepPositions,
    });
  }

  @Patch(':id/steps/:stepId/task')
  updateStepTask(
    @Param('id') automationId: string,
    @Param('stepId') stepId: string,
    @Body() task: AutomationTask,
  ): Promise<AutomationDto> {
    return this.automationsService.updateStepTask({
      accountId,
      automationId,
      stepId,
      task,
    });
  }

  @Delete(':id/steps')
  deleteSteps(
    @Param('id') automationId: string,
    @Body() deleteStepsDto: DeleteStepsDto,
  ): Promise<AutomationDto> {
    return this.automationsService.deleteSteps({
      accountId,
      automationId,
      stepIds: deleteStepsDto.stepIds,
    });
  }

  @Post(':id/connections')
  createConnection(
    @Param('id') automationId: string,
    @Body() connection: AutomationConnection,
  ): Promise<AutomationDto> {
    return this.automationsService.createConnection({
      accountId,
      automationId,
      connection,
    });
  }

  @Delete(':id/connections')
  deleteConnections(
    @Param('id') automationId: string,
    @Body() deleteConnectionsDto: DeleteConnectionsDto,
  ): Promise<AutomationDto> {
    return this.automationsService.deleteConnections({
      accountId,
      automationId,
      connectionIds: deleteConnectionsDto.connectionIds,
    });
  }
}
