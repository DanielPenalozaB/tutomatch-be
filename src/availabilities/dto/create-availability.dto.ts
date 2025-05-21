import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import { DayOfWeek } from '../enums/day-of-week.enum';

export class CreateAvailabilityDto {
  @ApiProperty({
    description: 'ID of the tutor who owns this availability',
    example: 1,
  })
  @IsNotEmpty()
  tutorId: number;

  @ApiProperty({
    description: 'Day of the week',
    example: DayOfWeek.Monday,
    enum: DayOfWeek,
  })
  @IsEnum(DayOfWeek)
  day: DayOfWeek;

  @ApiProperty({
    description: 'Start time of availability (HH:mm)',
    example: '09:00',
  })
  @IsString()
  startTime: string;

  @ApiProperty({
    description: 'End time of availability (HH:mm)',
    example: '11:00',
  })
  @IsString()
  endTime: string;

  @ApiProperty({
    description: 'Is this availability active?',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}


