import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_SERVICE') private readonly adminClient: ClientProxy,
  ) {}

  async getAllProducts() {
    let result = await lastValueFrom(
      this.adminClient
        .send({ cmd: 'getAllProducts' }, {})
        .pipe(map((res) => res)),
    );
    try {
      return result;
    } catch (error) {
      return error;
    }
  }



  async storeProduct(filename,body) {
    let result = await lastValueFrom(
      this.adminClient
        .send({ cmd: 'storeProduct' }, {filename,body})
        .pipe(map((res) => res)),
    );
    try {
      return result;
    } catch (error) {
      return error;
    }
  }
    async remove(id:number) {
        let result = await lastValueFrom(
          this.adminClient
            .send({ cmd: 'removeProduct' }, id)
            .pipe(map((res) => res)),
        );
        try {
          return result;
        } catch (error) {
          return error;
        }
  }

  async edit(id:number) {
    let result = await lastValueFrom(
      this.adminClient
        .send({ cmd: 'editProduct' }, id)
        .pipe(map((res) => res)),
    );
    try {
      return result;
    } catch (error) {
      return error;
    }
}


async update(body,filename,id) {
  let result = await lastValueFrom(
    this.adminClient
      .send({ cmd: 'editProduct' }, {body,filename,id})
      .pipe(map((res) => res)),
  );
  try {
    return result;
  } catch (error) {
    return error;
  }
}

}
