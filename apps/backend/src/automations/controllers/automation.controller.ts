import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { AutomationsRepository } from '../automations.repository';

import { AutomationDto } from '../dto/automation.dto';
import { UpdateAutomationDto } from '../dto/update-automation.dto';

const accountId = '666666666666666666666666';

@ApiTags('Automations')
@Controller('automations/:id')
@ApiParam({ name: 'id', type: String })
export class AutomationController {
  constructor(private readonly automationsRepository: AutomationsRepository) {}

  @Get()
  @ApiOperation({ summary: 'Get an automation by id' })
  @ApiOkResponse({
    description: 'Automation retrieved successfully',
    type: AutomationDto,
  })
  findOne(@Param('id') id: string) {
    return this.automationsRepository.findById(accountId, id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update an automation by id' })
  @ApiOkResponse({
    description: 'Automation updated successfully',
    type: AutomationDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateAutomationDto: UpdateAutomationDto,
  ) {
    return this.automationsRepository.update(
      accountId,
      id,
      updateAutomationDto,
    );
  }

  @Delete()
  @ApiOperation({ summary: 'Delete an automation by id' })
  @ApiOkResponse({
    description: 'Automation deleted successfully',
    type: AutomationDto,
  })
  remove(@Param('id') id: string) {
    return this.automationsRepository.delete(accountId, id);
  }
}
