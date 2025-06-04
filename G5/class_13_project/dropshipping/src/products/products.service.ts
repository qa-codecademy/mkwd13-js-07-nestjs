import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductUpdateDto } from './dto/product-update.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(productCreateDto: ProductCreateDto, userId: string) {
    const product = this.productRepository.create({
      ...productCreateDto,
      createdById: userId,
    });

    return this.productRepository.save(product);
  }

  async search() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({
      id,
    });

    if (!product) {
      throw new NotFoundException(`Product with ${id} not found`);
    }

    return product;
  }

  async update(id: string, productUpdateDto: ProductUpdateDto) {
    await this.findOne(id);

    await this.productRepository.update(id, productUpdateDto);

    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.softDelete(id);
  }
}

// await this.productRepository.update(id, { name: 'DELETED_' }); workaround for unique columns in SQL while soft deleting
