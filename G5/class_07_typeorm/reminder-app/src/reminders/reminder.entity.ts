import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Priority } from '../common/types/priority.enum';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@Entity('reminders')
export class Reminder {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    example: 'Go for a walk',
  })
  @Column()
  title: string;

  @ApiProperty({
    type: String,
    nullable: true,
    example: 'Go to walk around the neighborhood',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    type: String,
    example: '2025-01-20T15:00:00Z',
  })
  @Column({ type: 'timestamp', name: 'due_date' })
  dueDate: Date;

  @ApiProperty({
    enum: Priority,
    example: Priority.Medium,
    default: Priority.Medium,
  })
  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.Medium,
  })
  priority: Priority;

  @ApiProperty({
    type: Boolean,
    example: false,
    default: false,
  })
  @Column({
    type: 'boolean',
    default: false,
    name: 'is_completed',
  })
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.reminders)
  @JoinColumn({
    name: 'author_id',
  })
  author: User;

  @Column({
    name: 'author_id',
  })
  authorId: number;

  @ApiProperty({
    type: String,
    example: '2025-01-20T15:00:00Z',
  })
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    example: '2025-01-20T15:00:00Z',
  })
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;
}
