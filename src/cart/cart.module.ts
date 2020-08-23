import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Cart, CartSchema } from './cart.schema';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ProductModule } from '../product/product.module';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../auth/user.schema';
import { ProductSchema, Product } from '../product/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'tomer',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    AuthModule,
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartService, JwtStrategy],
  exports: [CartService],
})
export class CartModule {}
