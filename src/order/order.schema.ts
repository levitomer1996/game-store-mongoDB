import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../auth/user.schema';
import { Product } from '../product/product.schema';
import { Binary } from 'mongodb';
import { creditCard } from './DTO/NewOrder.dto';
import { OrderStatus } from './OrderStatus.emum';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  user: User;
  @Prop({ required: true })
  products: Product[];
  @Prop({ required: true })
  total_payment: number;
  @Prop({ required: true })
  time_submited: string;
  @Prop({ required: true })
  status: OrderStatus;
  @Prop({ required: true })
  creditCard: creditCard;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
