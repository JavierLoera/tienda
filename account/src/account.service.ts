import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  findByUserId(id: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { user: { id: id } },
      relations: ['items', 'items.product'],
    });
  }
}
