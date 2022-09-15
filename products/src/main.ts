import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductsModule } from './products.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductsModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT),
      },
    },
  );
  await app.listen();
  Logger.log('Products Microservice listening on port:' + process.env.PORT);
}
bootstrap();

