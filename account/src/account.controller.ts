import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountService } from './account.service';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern({ cmd: 'getUserOrders' })
  async orders(id:number) {
    return await this.accountService.findByUserId(id);
  }
}
