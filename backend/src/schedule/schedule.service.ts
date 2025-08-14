import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import {
  CreateDayDto,
  createScheduleDTO,
  CreateTopicDto,
} from './dtos/schedule';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async getAllSchedules() {
    const schedules = await this.prisma.schedule.findMany({
      include: {
        days: {
          include: {
            topics: true,
          },
        },
      },
    });

    return schedules;
  }

  async createSchedule(data: createScheduleDTO) {
    try {
      const { days, ...scheduleData } = data;

      const newSchedule = await this.prisma.schedule.create({
        data: {
          ...scheduleData,
          testDay: new Date(scheduleData.testDay),
          studyStartDate: new Date(scheduleData.studyStartDate),
          studyEndDate: new Date(scheduleData.studyEndDate),
          days: {
            create: days.map((day) => ({
              date: new Date(day.date),
              startTime: day.startTime,
              endTime: day.endTime,
              topics: {
                create: day.topics.map((topic) => ({
                  name: topic.name,
                  weight: topic.weight,
                  duration: topic.duration,
                  status: topic.status ?? false,
                })),
              },
            })),
          },
        },
        include: {
          days: {
            include: {
              topics: true,
            },
          },
        },
      });

      return newSchedule;
    } catch (error) {
      console.error('Erro ao criar cronograma:', error);
      // Prisma pode lançar erros como P2002 (violacao de unique constraint)
      // Você pode adicionar mais tratamento de erro específico aqui
      throw new InternalServerErrorException(
        'Não foi possível criar o cronograma.',
      );
    }
  }

  async createTopic(topicData: CreateTopicDto, dayId: string) {
    try {
      const existingDay = await this.prisma.day.findUnique({
        where: { id: dayId },
      });
      if (!existingDay) {
        throw new NotFoundException('Dia não encontrado.');
      }

      const newTopic = await this.prisma.topic.create({
        data: {
          ...topicData,
          day: {
            connect: { id: dayId },
          },
          status: topicData.status ?? false,
        },
      });

      return newTopic;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Erro ao criar tópico:', error);
      throw new InternalServerErrorException(
        'Não foi possível criar o tópico.',
      );
    }
  }

  async createDay(scheduleId: string, dayData: CreateDayDto) {
    try {
      const existingSchedule = await this.prisma.schedule.findUnique({
        where: { id: scheduleId },
      });

      if (!existingSchedule) {
        throw new NotFoundException('Cronograma não encontrado.');
      }

      //Checagem para ver se o dia já existe
      const existingDay = await this.prisma.day.findUnique({
        where: {
          scheduleId_date: {
            date: dayData.date,
            scheduleId: scheduleId,
          },
        },
      });

      if (existingDay) {
        throw new ConflictException('Dia já existe.');
      }

      const newDay = await this.prisma.day.create({
        data: {
          ...dayData,
          schedule: {
            connect: { id: scheduleId },
          },
          topics: undefined,
        },
      });

      return newDay;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      // Adicionar tratamento para ConflictException aqui
      if (error instanceof ConflictException) {
        // Novo
        throw error; // Re-lança a exceção de conflito
      }
      console.error('Erro ao criar dia:', error);
      throw new InternalServerErrorException('Não foi possível criar o dia.');
    }
  }
}
