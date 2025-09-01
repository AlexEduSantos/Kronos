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
  Put,
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

  // ======================
  // SCHEDULE
  // ======================
  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAllSchedules() {
    return this.scheduleService.getAllSchedules();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-schedules')
  async getMySchedules(@Request() req: any) {
    return this.scheduleService.getScheduleByUserId(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getScheduleById(@Param('id', new ParseUUIDPipe()) scheduleId: string) {
    return this.scheduleService.getScheduleById(scheduleId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSchedule(
    @Request() req: any,
    @Body() createScheduleDto: createScheduleDTO,
  ) {
    return this.scheduleService.createSchedule(createScheduleDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':scheduleId')
  async updateSchedule(
    @Param('scheduleId', new ParseUUIDPipe()) scheduleId: string,
    @Body() updateScheduleDto: createScheduleDTO,
  ) {
    return this.scheduleService.updateSchedule(scheduleId, updateScheduleDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':scheduleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSchedule(
    @Param('scheduleId', new ParseUUIDPipe()) scheduleId: string,
  ) {
    await this.scheduleService.deleteSchedule(scheduleId);
  }

  // ======================
  // DAY
  // ======================
  @UseGuards(AuthGuard('jwt'))
  @Get('days/:dayId')
  async getDayById(@Param('dayId', new ParseUUIDPipe()) dayId: string) {
    return this.scheduleService.getDayById(dayId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':scheduleId/days')
  @HttpCode(HttpStatus.CREATED)
  async createDay(
    @Param('scheduleId', new ParseUUIDPipe()) scheduleId: string,
    @Body() createDayDto: CreateDayDto,
  ) {
    return this.scheduleService.createDay(scheduleId, createDayDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('days/:dayId')
  async updateDay(
    @Param('dayId', new ParseUUIDPipe()) dayId: string,
    @Body() updateDayDto: CreateDayDto,
  ) {
    return this.scheduleService.updateDay(dayId, updateDayDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('days/:dayId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDay(@Param('dayId', new ParseUUIDPipe()) dayId: string) {
    await this.scheduleService.deleteDay(dayId);
  }

  // ======================
  // TOPIC
  // ======================
  @UseGuards(AuthGuard('jwt'))
  @Get('topics/:topicId')
  async getTopicById(@Param('topicId', new ParseUUIDPipe()) topicId: string) {
    return this.scheduleService.getTopicById(topicId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('days/:dayId/topics')
  @HttpCode(HttpStatus.CREATED)
  async createTopic(
    @Param('dayId', new ParseUUIDPipe()) dayId: string,
    @Body() createTopicDto: CreateTopicDto,
  ) {
    return this.scheduleService.createTopic(createTopicDto, dayId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('topics/:topicId')
  async updateTopic(
    @Param('topicId', new ParseUUIDPipe()) topicId: string,
    @Body() updateTopicDto: CreateTopicDto,
  ) {
    return this.scheduleService.updateTopic(topicId, updateTopicDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('topics/:topicId/status')
  async toggleTopicStatus(
    @Param('topicId', new ParseUUIDPipe()) topicId: string,
  ) {
    return this.scheduleService.toggleTopicStatus(topicId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('topics/:topicId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTopic(@Param('topicId', new ParseUUIDPipe()) topicId: string) {
    await this.scheduleService.deleteTopic(topicId);
  }
}
