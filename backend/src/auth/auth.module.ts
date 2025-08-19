import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UserModule, // Para usar UserService dentro de AuthService
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'umSegredoMuitoForte123!@#', // USE UMA VARIÁVEL DE AMBIENTE REAL AQUI!
      signOptions: { expiresIn: '60s' }, // Token expira em 60 segundos (para teste, pode ser mais)
    }),
  ],
  providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
