import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dtos/user';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return this.authService.login(newUser);
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: ExpressRequest) {
    return this.authService.login(req.user);
  }
}
