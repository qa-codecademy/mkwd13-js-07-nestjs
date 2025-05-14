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
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RemindersService } from './reminders.service';
import { ReminderCreateDto } from './dtos/reminder-create.dto';
import { Reminder } from './reminder.entity';
import { ReminderUpdateDto } from './dtos/reminder-update.dto';
import { ReminderQueryDto } from './dtos/reminder-query.dto';

@ApiTags('Reminders')
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  // localhost:3000/api/reminders?priority=High&searchTerm=kabel&isCompleted=true
  // {
  // priority: 'High',
  // searchTerm: 'kabel',
  // isCompleted: 'true'
  // }
  @Get()
  @ApiOperation({
    summary: 'Search reminders',
  })
  search(@Query() query: ReminderQueryDto): Promise<Reminder[]> {
    console.log(query);
    return this.remindersService.search(query);
  }

  // localhost:3000/api/reminders?userId=1 > this is ok
  // localhost:3000/api/users/:id/reminders  > this is not really ok
  // localhost:3000/api/reminders/:id > this is really not ok
  // localhost:3000/api/reminders/user/:id > this is preferable
  @Get('/user/:id')
  getUserReminders(
    @Param('id', ParseIntPipe) authorId: number,
  ): Promise<Reminder[]> {
    return this.remindersService.search({ authorId });
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
