import { Controller, Get, Injectable, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
@Injectable()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

@Get()
async getProducts(){
  return await this.productsService.getProducts();
}

@Get('/:id')
 async show(@Param('id') id:number){
    return await this.productsService.showProduct(id)
 }
}
