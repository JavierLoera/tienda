import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { RequestInterceptor } from './Interceptors/request.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalInterceptors(new RequestInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
  app.use(
    session({
      secret: process.env.SECRETJWT,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 600 }
    }),
  );
  Logger.log('Gateway listening on port:' + 4000)

}
bootstrap();
