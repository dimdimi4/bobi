import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { AutomationsRepository } from '../automations.repository';

import { AutomationDto } from '../dto/automation.dto';
import { PaginatedAutomationsDto } from '../dto/paginated-automations.dto';
import { CreateAutomationDto } from '../dto/create-automation.dto';

const accountId = '666666666666666666666666';

@ApiTags('Automations')
@Controller('automations')
export class AutomationsController {
  constructor(private readonly automationsRepository: AutomationsRepository) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new automation',
  })
  @ApiCreatedResponse({
    description: 'Automation created successfully',
    type: AutomationDto,
  })
  create(@Body() createAutomationDto: CreateAutomationDto) {
    return this.automationsRepository.create(accountId, createAutomationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all channels' })
  @ApiOkResponse({
    description: 'Return paginated automations',
    type: PaginatedAutomationsDto,
  })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findPaginated(
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ) {
    return this.automationsRepository.findPaginated(accountId, offset, limit);
  }
}
