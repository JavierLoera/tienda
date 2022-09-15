import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { ExceptionInterceptor } from '../Interceptors/exeption.Interceptor';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @UseInterceptors(ExceptionInterceptor)
  @Get('/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getById(id);
  }

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @UseInterceptors(ExceptionInterceptor)
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }

  @Patch('restoreUser/:id')
  async restoreUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.restoreUser(id);
  }

  @UseInterceptors(ExceptionInterceptor)
  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    return await this.userService.createUser(user);
  }
}
