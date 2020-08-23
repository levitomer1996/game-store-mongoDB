import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { UserSchema } from './auth/user.schema';
import { CartController } from './cart/cart.controller';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { MulterModule } from '@nestjs/platform-express';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://tomer:junkerms1@cluster0.vj77n.mongodb.net/gamestore?retryWrites=true&w=majority',
    ),
    MulterModule.register({ dest: 'uploads' }),
    AuthModule,
    ProductModule,
    CartModule,
    OrderModule,
    AdminModule,
  ],
  controllers: [AppController, CartController],
  providers: [AppService],
})
export class AppModule {}
