import {
  BadRequestException, Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      select: ['id', 'name', 'password','role'],
      where: { email },
    });
    return user;
  }

  async getUser(id: number): Promise<Partial<User> | Error> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      return new NotFoundException('No existe un usuario con ese Id');
    }
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async update(obj: any): Promise<boolean | Error> {
    const user = await this.userRepository.findOne({
      where: { id: obj.id, deleted_at: null },
    });
    if (user) {
      obj.updateUserDto.updated_at = new Date();
      return await this.userRepository
        .update(obj.id, obj.updateUserDto)
        .then((res) => (res.affected == 1 ? true : false));
    } else {
      return new BadRequestException('No existe el usuario');
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    return await this.userRepository
      .softDelete(id)
      .then((res) => (res.affected == 1 ? true : false));
  }

  async restoreDeletedUser(id: number): Promise<boolean> {
    return await this.userRepository
      .restore(id)
      .then((res) => (res.affected == 1 ? true : false));
  }

  async createUser(user: CreateUserDTO): Promise<Partial<User> | Error> {
    const userDb = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (userDb) {
      return new BadRequestException('Ya existe un usuario con ese email');
    }
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    const { password, sal, ...result } = newUser;
    return result;
  }


  updateBalance(id: number, balance: number) {
    return this.userRepository.update(id, { balance: balance });
  }
}
