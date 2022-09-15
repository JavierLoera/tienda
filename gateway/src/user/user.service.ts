import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
import { CreateUserDTO } from './dto/createUser.dto';
import { loginUserDTO } from './dto/loginUser.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
  ) {}

  async login(body: loginUserDTO) {
    const result = await lastValueFrom(
      this.usersClient.send({ cmd: 'loginUser' }, body).pipe(
        map((res) => {
          return res;
        }),
      ),
    );
    try {
      return result;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    const result = await lastValueFrom(
      this.usersClient.send({ cmd: 'userId' }, id).pipe(
        map((res) => {
          return res;
        }),
      ),
    );

    try {
      return result;
    } catch (error) {
      return error;
    }
  }

  async getUsers() {
    return this.usersClient.send({ cmd: 'users' }, {});
  }

  async updateUser(id, updateUserDto) {
    const result = await lastValueFrom(
      this.usersClient.send({ cmd: 'updateUser' }, { id, updateUserDto }).pipe(
        map((res) => {
          return res;
        }),
      ),
    );
    try {
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id) {
    return this.usersClient.send({ cmd: 'deleteUser' }, id);
  }

  async restoreUser(id) {
    return await this.usersClient.send({ cmd: 'restoreUser' }, id);
  }

  async createUser(user: CreateUserDTO) {
    const result = await lastValueFrom(
      this.usersClient.send({ cmd: 'createUser' }, user).pipe(
        map((res) => {
          return res;
        }),
      ),
    );
    try {
      return result;
    } catch (error) {
      return error;
    }
  }
}
