import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategory } from '../common/types/product-category.enum';
import { ProductDetailsDto } from './dto/product-details.dto';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({
    description: 'Product ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Product name', example: 'Premium Widget' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Product category',
    example: ProductCategory.ELECTRONICS,
    enum: ProductCategory,
  })
  @Column({
    type: 'enum',
    enum: ProductCategory,
  })
  category: ProductCategory;

  @ApiProperty({ description: 'Product price', example: 99.99, minimum: 0.01 })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    description: 'Product stock quantity',
    example: 100,
    minimum: 0,
  })
  @Column('int')
  stock: number;

  @ApiProperty({ description: 'Product details', type: ProductDetailsDto })
  @Column('jsonb')
  details: ProductDetailsDto;

  @ApiProperty({ description: 'User who created the product', type: User })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ApiProperty({ description: 'ID of the user who created the product' })
  @Column({ name: 'created_by' })
  createdById: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  @ApiProperty({ description: 'Product creation timestamp' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @ApiProperty({ description: 'Product last update timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  // no need for Api Property as it will not be returned ever
  deletedAt: Date;
}
