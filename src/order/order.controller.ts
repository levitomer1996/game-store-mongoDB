import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { Order } from './order.schema';
import { Product } from '../product/product.schema';
import { userInfo } from 'os';
import { NewOrder } from './DTO/NewOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post('/neworder')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  newOrder(@GetUser() user, @Body() order: NewOrder): Promise<Order> {
    return this.orderService.newOrder(user, order);
  }

  @Get('/getorder')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  getOrders(@GetUser() user): Promise<Order[]> {
    return this.orderService.getOrder(user);
  }

  @Get('/getpending')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  getPendingOrders(): Promise<Order[]> {
    return this.orderService.getPendingOrders();
  }
}
