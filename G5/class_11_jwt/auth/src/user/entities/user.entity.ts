import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: Number,
  })
  id: number;

  @Column()
  @ApiProperty({
    type: String,
  })
  name: string;

  @Column({ unique: true })
  @ApiProperty({
    type: String,
  })
  email: string;

  @Column()
  @ApiProperty({
    type: String,
  })
  password: string;

  @CreateDateColumn()
  @ApiProperty({
    type: Date,
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    type: Date,
  })
  updatedAt: Date;
}
