import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/schedule.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ScheduleModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
