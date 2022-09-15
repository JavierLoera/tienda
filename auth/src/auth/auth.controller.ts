import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @MessagePattern({ cmd: 'login-auth' })
  async login(body) {
   return this.authService.login(body.user);
  }

  @MessagePattern({ cmd: 'authorization' })
  async verifyToken(data) {
    return await this.authService.validate(data.token);
  }
}
