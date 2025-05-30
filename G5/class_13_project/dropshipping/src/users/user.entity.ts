import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../common/types/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column({ unique: true })
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    uniqueItems: true,
  })
  email: string;

  @Column()
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  name: string;

  @Column()
  // no need for Api Property as it will not be returned ever
  password: string;

  @Column()
  @ApiProperty({ description: 'User location', example: 'New York' })
  location: string;

  @Column('int')
  @ApiProperty({ description: 'User age', example: 30, minimum: 0 })
  age: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Column({
    name: 'refresh_token',
    nullable: true,
    type: 'text',
  })
  // no need for Api Property as it will not be returned ever
  refreshToken: string | null;

  @CreateDateColumn({
    name: 'created_at',
  })
  @ApiProperty({ description: 'User creation timestamp' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @ApiProperty({ description: 'User last update timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  // no need for Api Property as it will not be returned ever
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePasswords(attempt: string): Promise<boolean> {
    console.log(attempt, this.password);
    return await bcrypt.compare(attempt, this.password);
  }
}
