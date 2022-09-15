import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AdminModule } from './admin.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AdminModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT),
      },
    },
  );
  await app.listen();
  Logger.log('Admin Microservice listening on port:' + process.env.PORT);
}
bootstrap();

