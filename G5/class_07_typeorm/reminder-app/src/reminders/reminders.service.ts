import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reminder } from './reminder.entity';
import {
  Between,
  FindOptionsWhere,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { ReminderCreateDto } from './dtos/reminder-create.dto';
import { ReminderUpdateDto } from './dtos/reminder-update.dto';
import { ReminderQueryDto } from './dtos/reminder-query.dto';
import { ReminderSortBy } from '../common/types/reminder-sort-by.enum';
import { SortDirection } from '../common/types/sort-direction.enum';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private readonly reminderRepository: Repository<Reminder>,
  ) {}

  async search_v1({
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
  }: ReminderQueryDto): Promise<PaginatedResponseDto<Reminder>> {
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

    if (startDueDate && endDueDate) {
      query = {
        ...query,
        dueDate: Between(startDueDate, endDueDate),
      };
    } else {
      if (startDueDate) {
        query = {
          ...query,
          dueDate: MoreThanOrEqual(startDueDate),
        };
      }

      if (endDueDate) {
        query = {
          ...query,
          dueDate: LessThanOrEqual(endDueDate),
        };
      }
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
      payload: reminders,
      total,
    };
  }

  async search_v2({
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
  }: ReminderQueryDto): Promise<PaginatedResponseDto<Reminder>> {
    const queryBuilder =
      this.reminderRepository.createQueryBuilder('reminders');

    if (authorId) {
      queryBuilder.andWhere('reminders.author_id = :authorId', { authorId });
    }

    if (priority) {
      queryBuilder.andWhere('reminders.priority = :priority', { priority });
    }

    if (startDueDate && endDueDate) {
      queryBuilder.andWhere(
        'reminders.due_date BETWEEN :startDueDate AND :endDueDate',
        {
          startDueDate,
          endDueDate,
        },
      );
    } else {
      if (startDueDate) {
        queryBuilder.andWhere('reminders.due_date >= :startDueDate', {
          startDueDate,
        });
      }

      if (endDueDate) {
        queryBuilder.andWhere('reminders.due_date >= :endDueDate', {
          endDueDate,
        });
      }
    }

    if (searchTerm) {
      queryBuilder.andWhere(`reminders.title ILIKE %${searchTerm}%`);
    }

    if (isCompleted !== undefined) {
      queryBuilder.andWhere('reminders.is_completed = :isCompleted', {
        isCompleted,
      });
    }

    if (sortBy && sortDir) {
      queryBuilder.orderBy(`reminders.${sortBy}`, sortDir);
    }

    const skip = (page - 1) * pageSize;

    queryBuilder.skip(skip).take(pageSize);

    const [reminders, total] = await queryBuilder.getManyAndCount();

    return {
      payload: reminders,
      total,
    };
  }

  async getOne(id: number): Promise<Reminder> {
    // const reminder = await this.reminderRepository.findOne({
    //   where: { id },
    //   relations: ['author'],
    // });

    const reminder = await this.reminderRepository
      .createQueryBuilder('reminders')
      .where('reminders.id = :id', { id })
      .leftJoinAndSelect('reminders.author', 'users')
      .getOne();

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
