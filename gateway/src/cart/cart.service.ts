import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class CartService {
  constructor(
    @Inject('CART_SERVICE') private readonly cartClient: ClientProxy,
  ) {}

  async getOrdersUser(id:number,body){
    let result = await lastValueFrom(
      this.cartClient
        .send({ cmd: 'addOrder' }, {id,body})
        .pipe(map((res) => res)),
    );

    try {
      return result;
    } catch (error) {
      return error;
    }
  }
}
