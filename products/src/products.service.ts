import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}


  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }
  findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne({ where: { id } });
  }

  findByIds(ids: string[]): Promise<Product[]> {
    return this.productsRepository.findBy({ id: In(ids) });
  }
}
