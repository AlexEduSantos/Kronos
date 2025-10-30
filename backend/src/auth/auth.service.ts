import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UserDto } from './dto/user.dto';
import * as fs from 'fs/promises'; // Importe o módulo 'fs' promises
import * as path from 'path';

const UPLOAD_BASE_DIR = path.join(process.cwd(), 'public', 'uploads');

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerDto: RegisterDto): Promise<any> {
    const { email, name, password } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        avatar: '',
      },
    });

    const { password: userPassword, ...result } = newUser;
    return result;
  }

  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        schedules: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...result } = user;
    return result;
  }

  async updateUserProfile(userId: string, data: UserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: data,
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...result } = user;
    return result;
  }

  // Agora recebe o userId para também atualizar o registro do usuário no DB
  async uploadAvatar(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo recebido');
    }

    const publicPath = `/uploads/${file.filename}`;

    // Atualiza o campo avatar do usuário no banco
    await this.prisma.user.update({
      where: { id: userId },
      data: { avatar: publicPath },
    });

    return publicPath;
  }
}
