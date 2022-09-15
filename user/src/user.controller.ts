import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  //used for get the user uin auth service
  @MessagePattern({ cmd: 'getUser' })
  async getOneUserByEmail(email: string) {
    return await this.userService.getUserByEmail(email);
  }

  @MessagePattern({ cmd: 'userId' })
  async getUserById(id: number): Promise<Partial<User> | Error> {
    return await this.userService.getUser(id);
  }

  @MessagePattern({ cmd: 'users' })
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @MessagePattern({ cmd: 'updateUser' })
  async updateUser(updateUser: Partial<User>): Promise<boolean | Error> {
    return await this.userService.update(updateUser);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  async deleteUser(id: number): Promise<boolean> {
    return await this.userService.deleteUser(id);
  }

  @MessagePattern({ cmd: 'restoreUser' })
  async restoreUser(id: number): Promise<boolean> {
    return await this.userService.restoreDeletedUser(id);
  }

  @MessagePattern({ cmd: 'createUser' })
  async createUser(user: CreateUserDTO): Promise<Partial<User> | Error> {
    return await this.userService.createUser(user);
  }


  @MessagePattern({ cmd: 'updateBalance' })
  async updateBalance(data) {
    return await this.userService.updateBalance(data.id,data.newBalance);
  }
}
