import { Body, Controller, Injectable, Post, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { OrderDTO } from './dto/Order.dto';

@Controller('cart')
@Injectable()
export class CratController {
  constructor(private readonly accountService: CartService) {}

  @Post()
// @UseGuards(AuthGuard)
async addOrder(@Request() req,@Body() body:OrderDTO)
{
  return await this.accountService.getOrdersUser(2,body)
}
}

