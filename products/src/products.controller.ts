import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from './products.service';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


@MessagePattern({cmd:'getAllProducts'})
  async index() {
 return await this.productsService.findAll();
 }


 @MessagePattern({cmd:'showProduct'})
 async show(id:number) {
   return await this.productsService.findOne(id);
  }


  @MessagePattern({cmd:'findByIds'})
  async findByIds(productsId:string[]){
return await this.productsService.findByIds(productsId)

  }
}
