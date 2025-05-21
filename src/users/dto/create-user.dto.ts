import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Matches, MinLength, IsNumber } from 'class-validator';
import { Roles } from '../enums/roles.enum';
import { AcademicProgram } from '../enums/academic-program.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@admon.uniajc.edu.co',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  @Matches(
    /^[^\s@]+@(estudiante|profesores|admon)\.uniajc\.edu\.co$/,
    {
      message: 'Email must be from one of the allowed domains: estudiante.uniajc.edu.co, profesores.uniajc.edu.co, or admon.uniajc.edu.co',
    },
  )
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User role',
    example: 'student',
    enum: Roles,
    default: 'student',
  })
  @IsEnum(['student', 'tutor', 'admin'], {
    message: 'Role must be student, tutor, or admin'
  })
  @IsOptional()
  role?: Roles;

  @ApiProperty({
    description: 'Profile picture URL',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsOptional()
  profilePicture?: string;

  @ApiProperty({
    description: 'Brief bio of the user',
    example: 'I am a math enthusiast looking for tutoring in advanced calculus.',
    required: false,
  })
  @IsOptional()
  bio?: string;

  @ApiProperty({
    description: 'Academic program ID of the student',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  academicProgramId?: number;
}