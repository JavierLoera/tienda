import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CartService } from './cart.service';


@Controller('/cart')
export class CartController {
  constructor(
    private readonly cartService:CartService
  ) {}

  @MessagePattern({ cmd: 'addOrder' })
  async purchase(data) {
    return await this.cartService.purchase(data.id,data.body.products)
  }
}