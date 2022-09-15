import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    ClientsModule.register([
    {
      name: 'PRODUCTS_SERVICE',
      transport: Transport.TCP,
      options: { port: 4005 },
    },
    {
      name: 'USERS_SERVICE',
      transport: Transport.TCP,
      options: { port: 4008 },
    },
]),

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
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}


