import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column()
  date: string;

  @Column()
  capacity: number;

  @Column()
  duration: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
