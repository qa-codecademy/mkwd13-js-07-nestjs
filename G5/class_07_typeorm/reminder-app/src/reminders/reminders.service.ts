import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reminder } from './reminder.entity';
import { Repository } from 'typeorm';
import { ReminderCreateDto } from './dtos/reminder-create.dto';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private readonly reminderRepository: Repository<Reminder>,
  ) {}

  create(body: ReminderCreateDto): Promise<Reminder> {
    console.log('Creating a new reminder', body);
    const reminder = this.reminderRepository.create(body);
    return this.reminderRepository.save(reminder);
  }
}
