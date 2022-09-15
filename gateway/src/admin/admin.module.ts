import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './adminService';
import { Product } from './entities/product.entity';

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
    TypeOrmModule.forFeature([Product]),

    ClientsModule.register([
      {
        name: 'ADMIN_SERVICE',
        transport: Transport.TCP,
        options: { port: 4003 },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { port: 4002 },
      },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
