import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Res,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dtos/user';
import { AuthGuard } from '@nestjs/passport';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @HttpCode(200)
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const newUser = await this.userService.create(createUserDto);
    const { access_token } = await this.authService.login(newUser);

    // Define o cookie diretamente no controlador
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false, // Ou 'true' em produção
      sameSite: 'none',
      maxAge: 3600000,
    });
    return { message: 'Registro e login bem-sucedidos' };
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  async login(
    @Request() req: ExpressRequest,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const { access_token } = await this.authService.login(req.user);

    // Define o cookie diretamente no controlador
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 3600000,
      domain: 'localhost',
    });
    return { message: 'Login bem-sucedido' };
  }
}
