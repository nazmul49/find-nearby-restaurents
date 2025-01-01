import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { Roles } from './decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { User } from 'src/users/entities';
import { JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard, RolesGuard } from './guards';
import { GetUser } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return { message: 'User registered successfully' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@GetUser() user: User, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(user);

    // if (tokens) throw new Error('my unknown error');

    response.cookie('Refresh', tokens.refreshToken, {
      httpOnly: true,
      // secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      accessToken: tokens.accessToken,
    };
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refreshTokens(@GetUser() user: User, @Req() req: Request, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.refreshTokens(
      user.id,
      req['cookies'].Refresh,
    );

    response.cookie('Refresh', tokens.refreshToken, {
      httpOnly: true,
      // secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken: tokens.accessToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@GetUser() user: User, @Res({ passthrough: true }) response: Response) {
    await this.authService.logout(user.id);
    response.clearCookie('Refresh');
    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('profile')
  getProfile(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @Get('admin')
  adminRoute(@GetUser() user: User) {
    return { message: 'Admin route accessed successfully', user };
  }
}
