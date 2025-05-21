import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateAcademicAreaDto {
  @ApiProperty({ description: 'Name of the academic area', example: 'Matemáticas' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Code of the academic area', example: 'MAT' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Description of the academic area',
    example: 'Área dedicada a las matemáticas puras y aplicadas',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Whether the area is active',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}