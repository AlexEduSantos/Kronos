import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export interface ScheduleDTO {
  id: String;
  name: String;
  testDay: Date;
  studyStartDate: Date;
  studyEndDate: Date;
  days: [
    {
      id: String;
      scheduleId: String;
      date: Date;
      topics: [
        {
          id: String;
          dayId: String;
          name: String;
          weight: Number;
          duration: Number;
          status: Boolean;
        },
      ];
      startTime: String;
      endTime: String;
    },
  ];
  createdAt: Date;
  updatedAt: Date;
}

export class CreateTopicDto {
  @IsString()
  name: string;

  @IsNumber()
  weight: number;

  @IsNumber()
  duration: number;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}

export class CreateDayDto {
  @IsDateString()
  date: Date;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTopicDto)
  topics: CreateTopicDto[];

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}

export class createScheduleDTO {
  @IsString()
  name: string;

  @IsDateString()
  testDay: Date;

  @IsDateString()
  studyStartDate: Date;

  @IsDateString()
  studyEndDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDayDto)
  days: CreateDayDto[];
}
