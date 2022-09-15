import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AccountService {
  constructor(
    @Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientProxy,
  ) {}

  async getOrdersUser(id:number) {
    let result = await lastValueFrom(
      this.accountClient
        .send({ cmd: 'getUserOrders' }, id)
        .pipe(map((res) => res)),
    );

    try {
      return result;
    } catch (error) {
      return error;
    }
  }
}
