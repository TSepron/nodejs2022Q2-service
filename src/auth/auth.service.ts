import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { AuthUser } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly authUserRepository: Repository<AuthUser>,
    private jwtService: JwtService,
  ) {}

  async signup(createAuthDto: CreateAuthDto) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(createAuthDto.password, saltRounds);
    createAuthDto.password = hash;

    const newAuthUser = await this.authUserRepository.save(createAuthDto);

    return newAuthUser;
  }

  async login(createAuthDto: CreateAuthDto) {
    const { login, password } = createAuthDto;
    const authUser = await this.authUserRepository.findOneBy({ login });
    const hash = authUser?.password;

    const isPasswordCorrect = await bcrypt.compare(password, hash);

    if (!isPasswordCorrect) {
      throw new HttpException('authentication failed', HttpStatus.FORBIDDEN);
    }

    const payload: Payload = { userId: authUser.id, login: authUser.login };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }

  async refresh(refreshAuthDto: RefreshAuthDto) {
    const { refreshToken } = refreshAuthDto;
    const oldPayload: OldPayload = this._verifyJwt(refreshToken);
    delete oldPayload.iat;
    delete oldPayload.exp;

    const { userId, login, exp } = oldPayload;

    if (!exp) {
      throw new HttpException(
        'authentication failed, Refresh token is expired',
        HttpStatus.FORBIDDEN,
      );
    }

    return {
      accessToken: this.jwtService.sign({ userId, login }),
      refreshToken: this.jwtService.sign(
        { userId, login },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    };
  }

  _verifyJwt(refreshToken) {
    try {
      return this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
    } catch {
      throw new HttpException('authentication failed', HttpStatus.FORBIDDEN);
    }
  }
}
