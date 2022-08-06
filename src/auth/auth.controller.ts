import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

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
    res.setHeader('Authorization', 'Bearer ' + result.access_token);
    return result;
  }

  @Post('refresh')
  async refresh(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.refresh(createAuthDto);
  }
}
