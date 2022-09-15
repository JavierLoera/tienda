import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    TypeOrmModule.forFeature([Order,User,Product,Item]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}


