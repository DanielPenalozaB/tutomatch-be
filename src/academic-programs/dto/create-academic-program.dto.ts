import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, IsBoolean, IsOptional } from 'class-validator';

export class CreateAcademicProgramDto {
  @ApiProperty({ description: 'Name of the program', example: 'Ingeniería de Sistemas' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Code of the program', example: 'IS' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ description: 'Number of semesters in the program', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  totalSemesters: number;

  @ApiProperty({
    description: 'Whether the program is active',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}