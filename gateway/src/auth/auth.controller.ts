import {
  Body,
  Controller, Injectable,
  Post,
  Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login.dto';

@Controller('auth')
@Injectable()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async loginAuth(@Body() body:LoginUserDTO,@Req() req) {
    return await this.authService.loginAuth(body);
  }
}
