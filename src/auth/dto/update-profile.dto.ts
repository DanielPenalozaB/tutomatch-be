import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsUrl, Min, Max, IsEnum } from 'class-validator';
import { AcademicProgram } from 'src/academic-programs/entities/academic-program.entity';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Profile picture URL',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  profilePicture?: string;

  @ApiProperty({
    description: 'Brief bio of the user',
    example: 'I am a math enthusiast looking for tutoring in advanced calculus.',
    required: false,
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    description: 'Student code or identification',
    example: 'A12345',
    required: false,
  })
  @IsOptional()
  @IsString()
  studentCode?: string;

  @ApiProperty({
    description: 'Academic program ID of the student',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  academicProgramId?: number;

  @ApiProperty({
    description: 'Semester of study',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(12)
  semester?: number;
}