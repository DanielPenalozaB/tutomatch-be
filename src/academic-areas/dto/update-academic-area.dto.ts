import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAcademicAreaDto } from './create-academic-area.dto';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateAcademicAreaDto extends PartialType(CreateAcademicAreaDto) {
  @ApiProperty({
    description: 'Whether to toggle the active status',
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  toggleActive?: boolean;
}