import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AutomationStepsRepository } from './automation-steps.repository';

import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';

const accountId = '666666666666666666666666';

@ApiTags('Automations')
@Controller('automations/:id/steps')
export class AutomationStepsController {
  constructor(
    private readonly automationStepsRepository: AutomationStepsRepository,
  ) {}

  @Post()
  async addStep(@Param('id') id: string, @Body() createStepDto: CreateStepDto) {
    const automation = await this.automationStepsRepository.addStep(
      accountId,
      id,
      createStepDto,
    );
    if (!automation) {
      throw new NotFoundException('Automation not found');
    }
    return automation;
  }

  @Patch('/:stepId')
  async updateStep(
    @Param('id') id: string,
    @Param('stepId') stepId: string,
    @Body() updateStepDto: UpdateStepDto,
  ) {
    const automation = await this.automationStepsRepository.updateStep(
      accountId,
      id,
      stepId,
      updateStepDto,
    );
    if (!automation) {
      throw new NotFoundException('Automation or step not found');
    }
    return automation;
  }

  @Delete('/:stepId')
  async deleteStep(@Param('id') id: string, @Param('stepId') stepId: string) {
    const automation = await this.automationStepsRepository.deleteStep(
      accountId,
      id,
      stepId,
    );
    if (!automation) {
      throw new NotFoundException('Automation or step not found');
    }
    return automation;
  }
}
