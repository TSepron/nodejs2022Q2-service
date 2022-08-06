import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthUser } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly authUserRepository: Repository<AuthUser>,
    private jwtService: JwtService,
  ) {}

  async signup(createAuthDto: CreateAuthDto) {
    const newAuthUser = await this.authUserRepository.save(createAuthDto);

    return {
      message: `user with login: ${newAuthUser.login} had been successfully created`,
    };
  }

  async login(createAuthDto: CreateAuthDto) {
    const { login, password } = createAuthDto;
    const authUser = await this.authUserRepository.findOneBy({ login });

    if (authUser?.password !== password) {
      throw new HttpException('authentication failed', HttpStatus.FORBIDDEN);
    }

    const payload: Payload = { userId: authUser.id, login: authUser.login };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  refresh(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
}
