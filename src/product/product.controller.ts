import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { NewProductDTO } from './dto/newProduct.dto';
import { Product } from './product.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetAdmin } from '../admin/get-admin.decoration';
import { Admin } from '../admin/admin.schemna';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {
  constructor(private prodService: ProductService) {}
  @Post('/add')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  addProduct(@Body() newProduct: NewProductDTO): Promise<Product> {
    return this.prodService.addProduct(newProduct);
  }
  @Get('/getprods')
  getAllProducts(): Promise<Product[]> {
    return this.prodService.getAllProducts();
  }
  @Get('/preorders')
  getPreorders(): Promise<Product[]> {
    return this.prodService.getPreorders();
  }
  @Get('/category/:id')
  getProductByCategory(@Param('id') id): Promise<Product[]> {
    return this.prodService.getProductByCategory(id);
  }
  @Get('/proddetails/:id')
  getProdDetails(@Param('id') id: string): Promise<Product> {
    return this.prodService.getProdDetails(id);
  }
  //Used for adminstrain at Stock department when filtering product.
  @Post('/filterprod')
  filterProd(@Body() body): Promise<Product[]> {
    const { name } = body;
    return this.prodService.filterProd(name);
  }
}
