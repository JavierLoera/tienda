import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(emailIn: string, passwordIn: string): Promise<any> {    
    try {
      let user = await lastValueFrom(
        this.client.send({ cmd: 'getUser' }, emailIn).pipe(map((res) => res)),
      );
      if (user == null) {
        return null;
      }      
      let match = await bcrypt.compare(passwordIn, user.password);
      if (match) {
        const { sal, password, ...result } = user;
        return result;
      }
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }

  async login(user) {
    if (user.status == 400) {
      return new BadRequestException('Usuario o contrasena incorrectos');
    }

    const payload = { user, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validate(token: string) {
try {
  return this.jwtService.verify(token);
} catch (error) {
  return new  HttpException({
    status: HttpStatus.UNAUTHORIZED,
    error: 'El token ha expirado',
  }, HttpStatus.UNAUTHORIZED);
}
  }}
