import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reminder } from './reminder.entity';
import { Repository } from 'typeorm';
import { ReminderCreateDto } from './dtos/reminder-create.dto';
import { ReminderUpdateDto } from './dtos/reminder-update.dto';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private readonly reminderRepository: Repository<Reminder>,
  ) {}

  getAll(): Promise<Reminder[]> {
    return this.reminderRepository.find({ withDeleted: true });
  }

  async getOne(id: number): Promise<Reminder> {
    const reminder = await this.reminderRepository.findOneBy({
      id,
    });

    if (!reminder) {
      throw new NotFoundException(`Reminder with ID: ${id} not found`);
    }

    return reminder;
  }

  create(body: ReminderCreateDto): Promise<Reminder> {
    const reminder = this.reminderRepository.create(body);
    return this.reminderRepository.save(reminder);
  }

  async update(id: number, body: ReminderUpdateDto): Promise<Reminder> {
    // Option 1:
    const reminder = await this.getOne(id);

    const newReminder = { ...reminder, ...body };

    return this.reminderRepository.save(newReminder);

    // Option 2:
    // const result = await this.reminderRepository.update(
    //   {
    //     id,
    //   },
    //   body,
    // );
    // return this.getOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.reminderRepository.softDelete(id);
  }
}
