import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCOUNT_SERVICE',
        transport: Transport.TCP,
        options: { port: 4001 },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { port: 4002 },
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
