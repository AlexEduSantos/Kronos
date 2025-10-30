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
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { Request as ExpressRequest } from 'express';
import { User } from '@prisma/client';
import { SessionGuard } from './session.guard';
import { UserDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

interface MulterFile extends Express.Multer.File {}

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
  async getProfile(@Request() req: any) {
    const user = await this.authService.getUserProfile(req.user.id);
    return user;
  }

  @UseGuards(SessionGuard)
  @Patch('profile')
  async updateUserProfile(@Request() req: any, @Body() data: UserDto) {
    return this.authService.updateUserProfile(req.user.id, data);
  }

  @UseGuards(SessionGuard)
  @Post('profile/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadAvatar(@Request() req: any, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      // Retorna erro claro se nenhum arquivo foi enviado
      throw new (require('@nestjs/common').BadRequestException)('Nenhum arquivo enviado');
    }

    // Chama o serviço passando o userId para que o DB seja atualizado
    const publicPath = await this.authService.uploadAvatar(req.user.id, file);

    // Constroi uma URL absoluta para que o frontend (Next.js) consiga buscar a imagem
    const protocol = req.protocol || 'http';
    const host = req.get && req.get('host') ? req.get('host') : req.headers?.host;
    const fullUrl = `${protocol}://${host}${publicPath}`;

    return { avatar: fullUrl };
  }
}
