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

  // Funções para consulta
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

  async getScheduleByUserId(userId: string) {
    const schedules = await this.prisma.schedule.findMany({
      where: {
        userId: userId,
      },
      include: {
        days: {
          include: {
            topics: true,
          },
        },
      },
    });

    if (!schedules || schedules.length === 0) {
      throw new NotFoundException(
        'Nenhum cronograma encontrado para este usuário.',
      );
    }

    return schedules;
  }

  // Funções para criação
  async createSchedule(data: createScheduleDTO, userId: string) {
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
          userId: userId,
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

  // Funções para exclusão
  async deleteTopic(topicId: string) {
    try {
      const existingTopic = await this.prisma.topic.findUnique({
        where: { id: topicId },
      });

      if (!existingTopic) {
        throw new NotFoundException('Tópico não encontrado.');
      }

      await this.prisma.topic.delete({
        where: { id: topicId },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Erro ao deletar tópico:', error);
      throw new InternalServerErrorException(
        'Não foi possível deletar o tópico.',
      );
    }
  }

  async deleteDay(dayId: string) {
    try {
      const existingDay = await this.prisma.day.findUnique({
        where: { id: dayId },
      });

      if (!existingDay) {
        throw new NotFoundException('Dia não encontrado.');
      }

      await this.prisma.day.delete({
        where: { id: dayId },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Erro ao deletar dia:', error);
      throw new InternalServerErrorException('Não foi possível deletar o dia.');
    }
  }

  async deleteSchedule(scheduleId: string) {
    try {
      const existingSchedule = await this.prisma.schedule.findUnique({
        where: { id: scheduleId },
      });

      if (!existingSchedule) {
        throw new NotFoundException('Cronograma não encontrado.');
      }

      await this.prisma.schedule.delete({
        where: { id: scheduleId },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Erro ao deletar cronograma:', error);
      throw new InternalServerErrorException(
        'Não foi possível deletar o cronograma.',
      );
    }
  }
}
