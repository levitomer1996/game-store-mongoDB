import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Admin extends Document {
  @Prop({ required: true, unique: true })
  user: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  isAdmin: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
