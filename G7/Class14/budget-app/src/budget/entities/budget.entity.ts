import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'total_amount' })
  totalAmount: number;

  @Column({ name: 'from_date' })
  fromDate: Date;

  @Column({ name: 'to_date' })
  toDate: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.budget)
  transactions?: Transaction[];

  @CreateDateColumn({ name: 'created_at', default: new Date() })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true, default: null })
  updatedAt: Date;
}

// Import Transaction after the class declaration to avoid circular dependency
import { Transaction } from '../../transactions/entities/transaction.entity';
