import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RefreshAuthDto } from './dto/refresh-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signup(createAuthDto);
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() createAuthDto: CreateAuthDto,
  ) {
    const result = await this.authService.login(createAuthDto);
    res.setHeader('Authorization', 'Bearer ' + result.accessToken);
    res.setHeader('x-custom-header-refreshtoken', result.refreshToken);
    return result;
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Body() refreshAuthDto: RefreshAuthDto,
  ) {
    const result = await this.authService.refresh(refreshAuthDto);
    res.setHeader('Authorization', 'Bearer ' + result.accessToken);
    res.setHeader('x-custom-header-refreshtoken', result.refreshToken);
    return result;
  }
}
