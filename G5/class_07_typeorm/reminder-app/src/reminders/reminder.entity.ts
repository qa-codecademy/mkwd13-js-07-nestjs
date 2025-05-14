import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Priority } from '../common/types/priority.enum';
import { ApiProperty } from '@nestjs/swagger';

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
  @Column({ type: 'timestamp' })
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
  })
  isCompleted: boolean;

  @ApiProperty({
    type: String,
    example: '2025-01-20T15:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    type: String,
    example: '2025-01-20T15:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
