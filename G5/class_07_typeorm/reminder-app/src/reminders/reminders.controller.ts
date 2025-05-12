import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RemindersService } from './reminders.service';
import { ReminderCreateDto } from './dtos/reminder-create.dto';
import { Reminder } from './reminder.entity';

@ApiTags('Reminders')
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

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
}
