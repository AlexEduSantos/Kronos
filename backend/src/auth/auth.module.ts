import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '@/prisma/prisma.service';
import { UserModule } from '@/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'df0f7a7c8e2b1d3f5a7b9c1d3e5f7a9b',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
