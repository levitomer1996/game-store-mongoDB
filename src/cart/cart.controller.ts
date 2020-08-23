import {
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  UsePipes,
  Body,
  Get,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { Cart } from './cart.schema';
import { User } from '../auth/user.schema';
import { Product } from '../product/product.schema';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Post('/addproduct')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  addToCart(@GetUser() user: User, @Body('id') prod): Promise<Product> {
    console.log(user);
    return this.cartService.addToCart(user, prod);
  }

  @Post('/clearcart')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  clearCart(@GetUser() user) {
    return this.cartService.clearCart(user);
  }

  @Get('/myprods')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  getMyProd(@GetUser() user): Promise<Cart> {
    return this.cartService.getMyProd(user);
  }
}
