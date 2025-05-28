import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../types/role.enum';

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

  @Column({
    nullable: true,
  })
  @ApiProperty({
    type: String,
  })
  refreshToken: string;

  // Used for multiple access points (devices)
  // refreshTokens: string[]

  @Column({
    default: Role.User,
  })
  role: Role;

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
