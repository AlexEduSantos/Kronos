import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  CreateDayDto,
  createScheduleDTO,
  CreateTopicDto,
} from './dtos/schedule';
import { ScheduleService } from './schedule.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  // Rotas para consulta
  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAllSchedules() {
    const schedules = await this.scheduleService.getAllSchedules();

    return schedules;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-schedules')
  async getMySchedules(@Request() req: any) {
    const userId = req.user.userId;

    const schedules = await this.scheduleService.getScheduleByUserId(userId);

    return schedules;
  }

  // Rotas para criação
  @UseGuards(AuthGuard('jwt'))
  @Post('createSchedule')
  @HttpCode(HttpStatus.CREATED)
  async createSchedule(
    @Request() req: any,
    @Body() createScheduleDto: createScheduleDTO,
  ) {
    const userId = req.user.userId; // Get userId from the token

    const newSchedule =
      await this.scheduleService.createSchedule(createScheduleDto, userId);

    return newSchedule;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:scheduleId/days')
  @HttpCode(HttpStatus.CREATED)
  async createDay(
    @Param('scheduleId', new ParseUUIDPipe()) scheduleId: string,
    @Body() createDayDto: CreateDayDto,
  ) {
    const newDay = await this.scheduleService.createDay(
      scheduleId,
      createDayDto,
    );

    return newDay;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/days/:dayId/topics')
  @HttpCode(HttpStatus.CREATED)
  async createTopic(
    @Body() createTopicDto: CreateTopicDto,
    @Param('dayId', new ParseUUIDPipe()) dayId: string,
  ) {
    const newTopic = await this.scheduleService.createTopic(
      createTopicDto,
      dayId,
    );

    return newTopic;
  }

  // Rotas para exclusão
  @UseGuards(AuthGuard('jwt'))
  @Delete('/topics/:topicId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTopic(@Param('topicId', new ParseUUIDPipe()) topicId: string) {
    await this.scheduleService.deleteTopic(topicId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/days/:dayId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDay(@Param('dayId', new ParseUUIDPipe()) dayId: string) {
    await this.scheduleService.deleteTopic(dayId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:scheduleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSchedule(
    @Param('scheduleId', new ParseUUIDPipe()) scheduleId: string,
  ) {
    await this.scheduleService.deleteSchedule(scheduleId);
  }
}
