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

import { PaginationQueryDto } from './dto/pagination.query.dto';
import {
  BulkUpdateStepPositionsDto,
  CreateConnectionDto,
  CreateStepDto,
  UpdateStepTaskDto,
} from './dto/steps.dto';
import { AutomationsService } from './automations.service';
import { CreateAutomationDto } from './dto/automation.dto';
import { UpdateAutomationDto } from './dto/automation.dto';

const accountId = '666666666666666666666666';

@ApiTags('Automations')
@Controller('automations')
export class AutomationsController {
  constructor(private readonly automationsService: AutomationsService) {}

  @Post()
  create(@Body() createAutomationDto: CreateAutomationDto) {
    return this.automationsService.create(accountId, createAutomationDto);
  }

  @Get()
  findPaginated(@Query() query: PaginationQueryDto) {
    return this.automationsService.findPaginated(accountId, query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.automationsService.findOne(accountId, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAutomationDto: UpdateAutomationDto,
  ) {
    return this.automationsService.update(accountId, id, updateAutomationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.automationsService.delete(accountId, id);
  }

  @Post(':id/steps')
  async addStep(@Param('id') id: string, @Body() createStepDto: CreateStepDto) {
    return this.automationsService.addStep(accountId, id, createStepDto);
  }

  @Patch(':id/bulk-update-step-positions')
  async bulkUpdateStepPositions(
    @Param('id') id: string,
    @Body() updateStepDto: BulkUpdateStepPositionsDto,
  ) {
    return this.automationsService.bulkUpdateStepPositions(
      accountId,
      id,
      updateStepDto,
    );
  }

  @Patch(':id/steps/:stepId/task')
  async updateStepTask(
    @Param('id') id: string,
    @Param('stepId') stepId: string,
    @Body() updateStepDto: UpdateStepTaskDto,
  ) {
    return this.automationsService.updateStepTask(
      accountId,
      id,
      stepId,
      updateStepDto,
    );
  }

  @Delete(':id/steps/:stepId')
  async deleteStep(@Param('id') id: string, @Param('stepId') stepId: string) {
    return this.automationsService.deleteStep(accountId, id, stepId);
  }

  @Post(':id/connections')
  async createConnection(
    @Param('id') id: string,
    @Body() createConnectionDto: CreateConnectionDto,
  ) {
    return this.automationsService.createConnection(
      accountId,
      id,
      createConnectionDto,
    );
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
