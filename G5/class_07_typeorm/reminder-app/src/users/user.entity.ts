import { ApiProperty } from '@nestjs/swagger';
import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reminder } from '../reminders/reminder.entity';

// @Unique(['username'])
// @Unique(['email'])
@Check(`LENGTH(first_name) > 2`)
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    example: 'john.doe',
  })
  @Column({
    type: 'varchar',
    length: 30,
    unique: true,
  })
  username: string;

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Column({
    type: 'varchar',
    length: 30,
    unique: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    example: 'John',
  })
  @Column({
    type: 'varchar',
    length: 50,
    // VARCHAR(50)
    name: 'first_name',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
    name: 'last_name',
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  lastName: string;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  @Column({
    type: String,
    nullable: true,
    name: 'avatar_url',
  })
  avatarUrl: string | null;

  @OneToMany(() => Reminder, (reminder) => reminder.author)
  reminders: Reminder[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;
}
