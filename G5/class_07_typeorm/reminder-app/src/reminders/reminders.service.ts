import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reminder } from './reminder.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { ReminderCreateDto } from './dtos/reminder-create.dto';
import { ReminderUpdateDto } from './dtos/reminder-update.dto';
import { ReminderQueryDto } from './dtos/reminder-query.dto';
import { ReminderSortBy } from '../common/types/reminder-sort-by.enum';
import { SortDirection } from '../common/types/sort-direction.enum';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private readonly reminderRepository: Repository<Reminder>,
  ) {}

  async search({
    authorId,
    priority,
    startDueDate,
    endDueDate,
    isCompleted,
    searchTerm,
    sortBy = ReminderSortBy.CreatedAt,
    sortDir = SortDirection.DESC,
    page = 1,
    pageSize = 10,
  }: ReminderQueryDto): Promise<{
    reminders: Reminder[];
    total: number;
  }> {
    let query: FindOptionsWhere<Reminder> = {};

    if (authorId) {
      query = {
        ...query,
        authorId,
      };
    }

    if (priority) {
      query = {
        ...query,
        priority,
      };
    }

    if (isCompleted !== undefined) {
      query = {
        ...query,
        isCompleted,
      };
    }

    if (searchTerm) {
      query = {
        ...query,
        title: ILike(`%${searchTerm}%`),
      };
    }

    const [reminders, total] = await this.reminderRepository.findAndCount({
      where: query,
      order: {
        [`${sortBy}`]: sortDir,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      reminders,
      total,
    };
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

  async create(body: ReminderCreateDto): Promise<Reminder> {
    try {
      const reminder = this.reminderRepository.create(body);
      return await this.reminderRepository.save(reminder);
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.detail);
    }
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
