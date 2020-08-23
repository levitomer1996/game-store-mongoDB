import { Injectable, BadRequestException } from '@nestjs/common';
import { Product } from '../product/product.schema';
import { User } from '../auth/user.schema';
import { Order } from './order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import * as validators from 'credit-card-validate';
import * as valid from 'card-validator';
import { NewOrder, creditCard } from './DTO/NewOrder.dto';
import { OrderStatus } from './OrderStatus.emum';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async newOrder(user: User, order: NewOrder): Promise<Order> {
    const time_submited = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');
    const newOrder = new this.orderModel({
      user: user,
      products: order.products,
      time_submited,
      total_payment: order.total_payment,
      creditCard: order.creditCard,
      status: OrderStatus.PENDING,
    });
    console.log(newOrder);

    if (!this.checkCreditCard(order.creditCard)) {
      throw new BadRequestException();
    }
    try {
      await newOrder.save();
    } catch (error) {
      throw new BadRequestException();
    }
    return newOrder;
  }

  async checkCreditCard(creditCard: creditCard) {
    switch (creditCard.creditType) {
      case 'VISA':
        break;

      default:
        break;
    }
  }

  async getOrder(user: User): Promise<Order[]> {
    const list = await this.orderModel.find({ user });
    return list;
  }

  async getPendingOrders(): Promise<Order[]> {
    try {
      const list = await this.orderModel.find({ status: OrderStatus.PENDING });
      return list;
    } catch (error) {
      return;
    }
  }
}
