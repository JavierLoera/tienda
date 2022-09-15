import { Body, Controller, Injectable, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CartService } from './cart.service';

@Controller('cart')
@Injectable()
export class CratController {
  constructor(private readonly accountService: CartService) {}

  @Post()
@UseGuards(AuthGuard)
async addOrder(@Request() req,@Body() body){
  return await this.accountService.getOrdersUser(req.user.id,body)
}
}

