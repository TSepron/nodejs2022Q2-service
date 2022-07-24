import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  _formatUser(user: User) {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  async _checkAndGetUserIfExists(id: string) {
    const user = await this.userRepository.findOneBy({ id });

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

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const user = new User(login, password);

    const newUser = await this.userRepository.save(user);

    return this._formatUser(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this._checkAndGetUserIfExists(id);

    return this._formatUser(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserDto;

    const user = await this._checkAndGetUserIfExists(id);

    this._checkPassword(user.password, oldPassword);

    user.password = newPassword;
    user.version++;
    user.updatedAt = Date.now();
    user.createdAt = Number(user.createdAt);

    const updatedUser = await this.userRepository.save(user);

    return this._formatUser(updatedUser);
  }

  async remove(id: string) {
    const userForRemove = await this._checkAndGetUserIfExists(id);

    await this.userRepository.remove(userForRemove);
  }
}
