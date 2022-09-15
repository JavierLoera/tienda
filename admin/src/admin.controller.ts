import {
  Controller
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AdminService } from './admin.service';
import { Product } from './entities/product.entity';


@Controller('/admin/products')
export class AdminController {
  constructor(private readonly adminService:AdminService) {}

  @MessagePattern({ cmd: 'getAllProducts' })
  async index() { 
    return await this.adminService.findAll();
   }

  
   @MessagePattern({ cmd: 'storeProduct' })
   async storeProduct(data){
            const newProduct = new Product();
       newProduct.setName(data.body.name);
       newProduct.setDescription(data.body.description);
       newProduct.setPrice(data.body.price);
       newProduct.setImage(data.filename);
    return  await this.adminService.createOrUpdate(newProduct);

   }
   

   @MessagePattern({ cmd: 'removeProduct' })
   async remove(id:string):Promise<boolean>{
    return this.adminService.remove(id);
  }

  @MessagePattern({ cmd: 'editProduct' })
  async update(data) {
      const product = await this.adminService.findOne(data.id);      
      product.setName(data.body.name);
      product.setDescription(data.body.description);
      product.setPrice(data.body.price);
        product.setImage(data.filename);
      return await this.adminService.createOrUpdate(product);
    }
   
    }



