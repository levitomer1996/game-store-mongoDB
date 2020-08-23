import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Cart } from './cart.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductSchema } from '../product/product.schema';
import { User } from '../auth/user.schema';
import { STATUS_CODES } from 'http';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async addToCart(user: User, prod: string): Promise<Product> {
    const foundProduct = await this.productModel.findById(prod).exec();
    const foundCart = await this.cartModel.findOne({ user: user }).exec();
    if (!foundCart) {
      const newCart = new this.cartModel({
        user: user,
        products: [foundProduct],
      });
      console.log(newCart);
      try {
        await newCart.save();
        return foundProduct;
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await this.cartModel.findOneAndUpdate(
        { user: user },
        { products: [...foundCart.products, foundProduct] },
      );
    } catch (error) {
      console.log(error);
    }
    return foundProduct;
  }

  async getMyProd(user: User): Promise<Cart> {
    const cart = await this.cartModel.findOne({ user: user }).exec();
    if (!cart) {
      throw new BadRequestException('Please add products to your cart');
    }
    return cart;
  }

  async clearCart(user: User) {
    const clear = await this.cartModel.findOneAndDelete({ user });
    return 'Cart was deleted';
  }
}
