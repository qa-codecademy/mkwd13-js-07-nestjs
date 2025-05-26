import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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

  @Column({
    unique: true,
  })
  @ApiProperty({
    type: String,
    example: 'john.doe',
  })
  username: string;

  @Column()
  @ApiProperty({
    type: String,
  })
  password: string;

  @Column()
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  @ApiProperty({
    type: Date,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @ApiProperty({
    type: Date,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  @ApiProperty({
    type: Date,
  })
  deletedAt: Date;
}
