import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Roles } from '../../users/enums/roles.enum';

export class RegisterDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@admon.uniajc.edu.co',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
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
}