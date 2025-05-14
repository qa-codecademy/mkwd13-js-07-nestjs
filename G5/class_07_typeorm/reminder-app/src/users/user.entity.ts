import { ApiProperty } from '@nestjs/swagger';
import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// @Unique(['username'])
// @Unique(['email'])
// @Check(`LENGTH(firstName) > 2`)
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
  })
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
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
  })
  avatarUrl: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
