import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
       synchronize: true,
}),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
