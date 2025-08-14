import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateDayDto, createScheduleDTO, CreateTopicDto } from './dtos/schedule';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get('all')
  async getAllSchedules() {
    const schedules = await this.scheduleService.getAllSchedules();

    return schedules;
  }

  @Post('createSchedule')
  @HttpCode(HttpStatus.CREATED)
  async createSchedule(@Body() createScheduleDto: createScheduleDTO) {
    const newSchedule =
      await this.scheduleService.createSchedule(createScheduleDto);

    return newSchedule;
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

  @Post('/:scheduleId/days')
  @HttpCode(HttpStatus.CREATED)
  async createDay(
    @Param('scheduleId', new ParseUUIDPipe()) scheduleId: string,
    @Body() createDayDto: CreateDayDto,
  ) {
    const newDay = await this.scheduleService.createDay(scheduleId, createDayDto);

    return newDay;
  }
}
