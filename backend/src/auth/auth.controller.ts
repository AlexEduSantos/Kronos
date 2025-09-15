import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { Request as ExpressRequest } from 'express';
import { User } from '@prisma/client';
import { SessionGuard } from './session.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: ExpressRequest, @Body() loginDto: LoginDto) {
    return new Promise((resolve, reject) => {
      req.login(req.user as User, (err: Error) => {
        if (err) {
          return reject(err);
        }
        req.session.save((err: Error) => {
          if (err) {
            return reject(err);
          }
          resolve(req.user);
        });
      });
    });
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Request() req: ExpressRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    req.logout((err) => {
      if (err) {
        return { message: 'Falha ao encerrar a sessão' };
      }
      return { message: 'Sessão encerrada com sucesso!' };
    });
  }

  @UseGuards(SessionGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
