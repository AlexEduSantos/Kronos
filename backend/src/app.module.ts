import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/schedule.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ScheduleModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
