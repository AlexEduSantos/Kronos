// backend/src/auth/auth.controller.ts
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@/user/dtos/create-user.dto'; // Importe o DTO para registro
import { UserService } from '@/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService, // Injetar UserService para registro
  ) {}

  // Endpoint de REGISTRO
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    // Opcional: retornar um token após o registro
    return this.authService.login(newUser);
  }

  // Endpoint de LOGIN (usa a LocalStrategy)
  @UseGuards(AuthGuard('local')) // Aplica o LocalAuthGuard
  @Post('login')
  async login(@Request() req: Express.Request) {
    // req.user contém o objeto do usuário retornado por validateUser na LocalStrategy
    return this.authService.login(req.user);
  }
}
