import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './startegies/jwt.strategy';
import { LocalStrategy } from './startegies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    ClientsModule.register([
      {
        name: 'USER_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4008,
        },
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
