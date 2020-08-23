import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { Model } from 'mongoose';
import { NewProductDTO } from './dto/newProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async addProduct(newProduct: NewProductDTO): Promise<Product> {
    const prod = new this.productModel(newProduct);
    try {
      await prod.save();
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
    return prod;
  }

  async getPreorders(): Promise<Product[]> {
    const list = await this.productModel.find({ isPreOrder: true }).exec();
    return list;
  }

  async getProductByCategory(id): Promise<Product[]> {
    const list = await this.productModel.find({ productType: id });
    return list;
  }

  async getProdDetails(id: string): Promise<Product> {
    const prod = await this.productModel.findById(id);
    return prod;
  }
  async getAllProducts(): Promise<Product[]> {
    const prodList = await this.productModel.find({});
    return prodList;
  }

  async filterProd(name): Promise<Product[]> {
    const list = await this.productModel.find({ name });
    return list;
  }
}
