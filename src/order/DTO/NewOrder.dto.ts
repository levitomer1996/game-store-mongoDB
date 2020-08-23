import { Product } from '../../product/product.schema';
import { IsNumber, IsString, IsIn } from 'class-validator';
import { CreditType } from '../CreditType.enum';

export class creditCard {
  @IsString()
  name_On_Card: string;
  @IsNumber()
  number: number;
  @IsString()
  exp: string;
  @IsNumber()
  cvc: number;
  @IsIn([CreditType])
  creditType: CreditType;
}
export class NewOrder {
  products: Product[];
  total_payment: Number;
  creditCard: creditCard;
}
