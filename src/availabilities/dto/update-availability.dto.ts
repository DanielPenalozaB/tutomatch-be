import { PartialType } from '@nestjs/mapped-types';
import { CreateAvailabilityDto } from './create-availability.dto';
import { IsEnum, IsOptional, IsString, IsBoolean } from 'class-validator';
import { DayOfWeek } from '../enums/day-of-week.enum';

export class UpdateAvailabilityDto extends PartialType(CreateAvailabilityDto) {
  @IsOptional()
  @IsEnum(DayOfWeek)
  day?: DayOfWeek;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
