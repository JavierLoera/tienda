import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async loginAuth(body) {
    let result = await lastValueFrom(
      this.authClient
        .send({ cmd: 'login-auth' }, { body })
        .pipe(map((res) => res)),
    );
    if (result.status == 400) {
      throw new BadRequestException(result.message);
    }
    try {
      return result;
    } catch (error) {
      return error;
    }
  }
}
