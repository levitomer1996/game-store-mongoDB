import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  Matches,
  IsEmail,
  IsBoolean,
  IsIn,
} from 'class-validator';
import { ProductType } from '../productType.enum';

export class NewProductDTO {
  @IsString()
  name: string;
  @IsString()
  img: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsNumber()
  ammount_stock: number;
  @IsBoolean()
  isPreOrder: boolean;
  @IsIn([
    ProductType.PC,
    ProductType.Accessories,
    ProductType.NewReleases,
    ProductType.PLAYSTATION4,
    ProductType.PLAYSTATION5,
    ProductType.XBOX_ONE,
  ])
  productType: ProductType;
}
