import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AccountModule } from './account/account.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/uploads'),
  }),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    AdminModule,
    ProductsModule,
    AccountModule,
    CartModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }


