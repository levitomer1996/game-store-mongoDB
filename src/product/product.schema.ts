import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductType } from './productType.enum';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  img: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  ammount_stock: number;
  @Prop({ required: true })
  productType: ProductType;
  @Prop({ required: true })
  isPreOrder: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
