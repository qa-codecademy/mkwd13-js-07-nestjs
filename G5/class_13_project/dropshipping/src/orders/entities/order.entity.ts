import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../../common/types/order-status.enum';
import { User } from '../../users/user.entity';
import { OrderItem } from './order-item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Order ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  @ApiProperty({
    description: 'Order status',
    enum: OrderStatus,
    example: OrderStatus.Pending,
  })
  status: OrderStatus;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({ description: 'Total price of the order' })
  totalPrice: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  @ApiProperty({ description: 'User who created the order', type: User })
  createdBy: User;

  @Column({ name: 'created_by' })
  createdById: string;

  @OneToMany(() => OrderItem, (item) => item.order)
  @ApiProperty({
    type: [OrderItem],
    description: 'Orders items',
  })
  items: OrderItem[];

  @CreateDateColumn({
    name: 'created_at',
  })
  @ApiProperty({ description: 'Order creation timestamp' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @ApiProperty({ description: 'Order last update timestamp' })
  updatedAt: Date;
}
