import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }
  findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne({ where: { id } });
  }
  createOrUpdate(product: Product): Promise<Product> {
    return this.productsRepository.save(product);
  }

  async remove(id: string): Promise<boolean> {
    return await this.productsRepository.delete(id).then((res) => (res.affected == 1 ? true : false));
  }

}