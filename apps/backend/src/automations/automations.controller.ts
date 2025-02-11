import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AutomationsRepository } from './automations.repository';

import { CreateAutomationDto } from './dto/create-automation.dto';
import { UpdateAutomationDto } from './dto/update-automation.dto';
import { PaginationQueryDto } from './dto/pagination.query.dto';

const accountId = '666666666666666666666666';

@ApiTags('Automations')
@Controller('automations')
export class AutomationsController {
  constructor(private readonly automationsRepository: AutomationsRepository) {}

  @Post()
  create(@Body() createAutomationDto: CreateAutomationDto) {
    return this.automationsRepository.create(accountId, createAutomationDto);
  }

  @Get()
  async findPaginated(@Query() query: PaginationQueryDto) {
    return this.automationsRepository.findPaginated(
      accountId,
      query.offset,
      query.limit,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const automation = await this.automationsRepository.findOne(accountId, id);
    if (!automation) {
      throw new NotFoundException('Automation not found');
    }
    return automation;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAutomationDto: UpdateAutomationDto,
  ) {
    const automation = await this.automationsRepository.update(
      accountId,
      id,
      updateAutomationDto,
    );
    if (!automation) {
      throw new NotFoundException('Automation not found');
    }
    return automation;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const automation = await this.automationsRepository.delete(accountId, id);
    if (!automation) {
      throw new NotFoundException('Automation not found');
    }
    return automation;
  }
}
