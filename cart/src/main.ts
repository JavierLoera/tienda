import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { CartModule } from "./cart.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CartModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT)
      }
    },
  )
  await app.listen();
  Logger.log('Cart Microservice listening on port:' + process.env.PORT);
}
bootstrap();