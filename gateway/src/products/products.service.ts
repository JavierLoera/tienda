import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  async getProducts() {
    let result = await lastValueFrom(
      this.productsClient
        .send({ cmd: 'getAllProducts' }, {})
        .pipe(map((res) => res)),
    );

    try {
      return result;
    } catch (error) {
      return error;
    }
  }

  async showProduct(id:number) {
    let result = await lastValueFrom(
      this.productsClient
        .send({ cmd: 'showProduct' }, id)
        .pipe(map((res) => res)),
    );

    try {
      return result;
    } catch (error) {
      return error;
    }
  }
}
