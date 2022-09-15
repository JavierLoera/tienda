import { Controller, Get, Injectable, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AccountService } from './account.service';

@Controller('account')
@Injectable()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

@Get()
@UseGuards(AuthGuard)
async getOrdersUser(@Request() req){
  return await this.accountService.getOrdersUser(req.user.id)
}

}
