import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RemindersService } from './reminders.service';
import { ReminderCreateDto } from './dtos/reminder-create.dto';
import { Reminder } from './reminder.entity';
import { ReminderUpdateDto } from './dtos/reminder-update.dto';

@ApiTags('Reminders')
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all reminders',
  })
  getAll(): Promise<Reminder[]> {
    return this.remindersService.getAll();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get one reminder by ID',
  })
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Reminder> {
    return this.remindersService.getOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new reminder',
  })
  @ApiCreatedResponse({
    description: 'Created reminder',
    type: Reminder,
  })
  create(@Body() body: ReminderCreateDto): Promise<Reminder> {
    return this.remindersService.create(body);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update reminder',
  })
  update(
    @Body() body: ReminderUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Reminder> {
    return this.remindersService.update(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.remindersService.delete(id);
  }
}
