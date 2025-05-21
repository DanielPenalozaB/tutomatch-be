import { ApiProperty } from '@nestjs/swagger';
import { AcademicAreaResponseDto } from 'src/academic-areas/dto/academic-area-response.dto';
import { AcademicProgramResponseDto } from 'src/academic-programs/dto/academic-program-response.dto';

export class SubjectResponseDto {
  @ApiProperty({ description: 'Subject ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Subject name', example: 'Cálculo Diferencial' })
  name: string;

  @ApiProperty({ description: 'Subject code', example: 'MAT-101' })
  code: string;

  @ApiProperty({
    description: 'Subject description',
    example: 'Introducción a los conceptos fundamentales del cálculo diferencial',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({ description: 'Number of credits', example: 3 })
  credits: number;

  @ApiProperty({ description: 'Typical semester', example: 2 })
  semester: number;

  @ApiProperty({ description: 'Whether subject is active', example: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Academic program',
    type: AcademicProgramResponseDto,
  })
  academicProgram: AcademicProgramResponseDto;

  @ApiProperty({
    description: 'Academic area',
    type: AcademicAreaResponseDto,
  })
  academicArea: AcademicAreaResponseDto;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-04-30T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-04-30T12:00:00Z',
  })
  updatedAt: Date;
}