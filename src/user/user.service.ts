import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  _formatUser(user: User) {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  _checkAndGetUserIfExists(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (user == null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  _checkPassword(savedPassword: string, sendedPassword: string) {
    if (savedPassword !== sendedPassword) {
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
    }
  }

  create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const user = new User(login, password);

    this.users.push(user);

    return this._formatUser(user);
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this._checkAndGetUserIfExists(id);

    return this._formatUser(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserDto;

    const user = this._checkAndGetUserIfExists(id);

    this._checkPassword(user.password, oldPassword);

    user.password = newPassword;
    user.version++;
    user.updatedAt = Date.now();

    return this._formatUser(user);
  }

  remove(id: string) {
    this._checkAndGetUserIfExists(id);

    this.users = this.users.filter((user) => user.id !== id);
  }
}
