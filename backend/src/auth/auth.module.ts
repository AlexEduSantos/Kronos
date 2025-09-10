import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocalStrategy } from './local.strategy';
import { SessionGuard } from './session.guard';
import { SessionSerializer } from './session.serializer';
@Module({
  imports: [PassportModule.register({ session: true }), PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, SessionGuard],
})
export class AuthModule {}
