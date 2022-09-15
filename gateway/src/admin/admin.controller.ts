import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { diskStorage } from "multer";
import { unlink } from 'node:fs/promises';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { renamefile } from 'src/helpers/renamefile';
import { Repository } from 'typeorm';
import { AdminService } from './adminService';
import { Product } from './entities/product.entity';

  @Controller('admin')
  @Injectable()
  export class AdminController {  
    constructor(private readonly adminService:AdminService,
      @InjectRepository(Product) private productsRepository: Repository<Product>) {}
  


    @Get('/')
    async getAllProducts(){
      return await this.adminService.getAllProducts()
    }


    
    @Post('/store')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles('admin')
    @UseInterceptors(FileInterceptor('image', { storage:diskStorage({destination: './public/uploads',
    filename:renamefile
    })
  }))
    async store(
      @Body() body,
      @UploadedFile() file: Express.Multer.File,
    ) {
      const filenameConverted = 'localhost:4000/'+file.filename
      return await this.adminService.storeProduct(filenameConverted,body)
    }
    

    @Delete('/:id')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles('admin')
    async remove(@Param('id') id: number){
      const product=await this.productsRepository.findOneBy({id:id})  
      try {
        await unlink(`./public/uploads/${product.image}`);
        console.log('eliminado');
      } catch (error) {
        console.error('Hubo un error:', error.message);
      }
   return await this.adminService.remove(id)
    }



    @UseInterceptors(FileInterceptor('image', { storage:diskStorage({destination: './public/uploads',
    filename:renamefile
    })
  }))
    @Patch('/:id')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles('admin')
    async update(
      @Body() body,
      @UploadedFile() file: Express.Multer.File,
      @Param('id') id: number,
    ) {
      try {
      const product=await this.productsRepository.findOneBy({id:id})
      if(!product){
    throw new BadRequestException("No existe ese producto")
      }
        await unlink(`./public/uploads/${product.image}`);
        console.log('eliminado');
        return await this.adminService.update(body,file.filename,id)
      } catch (error) {
        return error 
      }
    }

  }
  