import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAcademicProgramDto } from './create-academic-program.dto';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateAcademicProgramDto extends PartialType(CreateAcademicProgramDto) {
  @ApiProperty({
    description: 'Whether to toggle the active status',
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  toggleActive?: boolean;
}