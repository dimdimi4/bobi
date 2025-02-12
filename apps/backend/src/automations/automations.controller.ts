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

import { AutomationConnection } from './schemas/automation.schema';
import { AutomationTask } from './schemas/automation-tasks.schema';

import { PaginationQueryDto } from './dto/pagination.query.dto';
import { MutateAutomationDto } from './dto/mutate-automation.dto';
import { BulkUpdateStepPositionsDto } from './dto/bulk-update-step-positions.dto';
import { CreateStepDto } from './dto/create-step.dto';

const accountId = '666666666666666666666666';

@ApiTags('Automations')
@Controller('automations')
export class AutomationsController {
  constructor(private readonly automationsService: AutomationsService) {}

  @Post()
  create(@Body() mutateAutomationDto: MutateAutomationDto) {
    return this.automationsService.create(accountId, mutateAutomationDto);
  }

  @Get()
  findPaginated(@Query() query: PaginationQueryDto) {
    console.log(query);
    return this.automationsService.findPaginated(accountId, query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.automationsService.findOne(accountId, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() mutateAutomationDto: MutateAutomationDto,
  ) {
    return this.automationsService.update(accountId, id, mutateAutomationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.automationsService.delete(accountId, id);
  }

  @Post(':id/steps')
  createStep(@Param('id') id: string, @Body() createStepDto: CreateStepDto) {
    return this.automationsService.createStep(accountId, id, createStepDto);
  }

  @Patch(':id/bulk-update-step-positions')
  async bulkUpdateStepPositions(
    @Param('id') id: string,
    @Body() stepPositions: BulkUpdateStepPositionsDto,
  ) {
    return this.automationsService.bulkUpdateStepPositions(
      accountId,
      id,
      stepPositions,
    );
  }

  @Patch(':id/steps/:stepId/task')
  async updateStepTask(
    @Param('id') id: string,
    @Param('stepId') stepId: string,
    @Body() task: AutomationTask,
  ) {
    return this.automationsService.updateStepTask(accountId, id, stepId, task);
  }

  @Delete(':id/steps/:stepId')
  async deleteStep(@Param('id') id: string, @Param('stepId') stepId: string) {
    return this.automationsService.deleteStep(accountId, id, stepId);
  }

  @Post(':id/connections')
  async createConnection(
    @Param('id') id: string,
    @Body() connection: AutomationConnection,
  ) {
    return this.automationsService.createConnection(accountId, id, connection);
  }

  @Delete(':id/connections/:connectionId')
  async deleteConnection(
    @Param('id') id: string,
    @Param('connectionId') connectionId: string,
  ) {
    return this.automationsService.deleteConnection(
      accountId,
      id,
      connectionId,
    );
  }
}
