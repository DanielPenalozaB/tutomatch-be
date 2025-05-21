import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    description: 'Name of the subject',
    example: 'Cálculo Diferencial',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Subject code',
    example: 'MAT-101',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Brief description of the subject',
    example: 'Introducción a los conceptos fundamentales del cálculo diferencial',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Number of academic credits',
    example: 3,
  })
  @IsNotEmpty()
  @IsNumber()
  credits: number;

  @ApiProperty({
    description: 'Semester when the subject is typically taken',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  semester: number;

  @ApiProperty({
    description: 'ID of the academic program this subject belongs to',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  academicProgramId: number;

  @ApiProperty({
    description: 'ID of the academic area this subject belongs to',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  academicAreaId: number;

  @ApiProperty({
    description: 'Whether the subject is currently active in the curriculum',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}