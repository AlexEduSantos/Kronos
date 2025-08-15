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
} from '@nestjs/common';
import {
  CreateDayDto,
  createScheduleDTO,
  CreateTopicDto,
} from './dtos/schedule';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  // Rotas para consulta
  @Get('all')
  async getAllSchedules() {
    const schedules = await this.scheduleService.getAllSchedules();

    return schedules;
  }

  @Get(':scheduleId')
  async getScheduleById(
    @Param('scheduleId', new ParseUUIDPipe()) scheduleId: string,
  ) {
    const schedule = await this.scheduleService.getScheduleById(scheduleId);
    return schedule;
  }

  // Rotas para criação
  @Post('createSchedule')
  @HttpCode(HttpStatus.CREATED)
  async createSchedule(@Body() createScheduleDto: createScheduleDTO) {
    const newSchedule =
      await this.scheduleService.createSchedule(createScheduleDto);

    return newSchedule;
  }

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
  @Delete('/topics/:topicId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTopic(@Param('topicId', new ParseUUIDPipe()) topicId: string) {
    await this.scheduleService.deleteTopic(topicId);
  }

  @Delete('/days/:dayId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDay(@Param('dayId', new ParseUUIDPipe()) dayId: string) {
    await this.scheduleService.deleteTopic(dayId);
  }

  @Delete('/:scheduleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSchedule(
    @Param('scheduleId', new ParseUUIDPipe()) scheduleId: string,
  ) {
    await this.scheduleService.deleteSchedule(scheduleId);
  }
}
