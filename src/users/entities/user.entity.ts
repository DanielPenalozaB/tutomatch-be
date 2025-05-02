import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Roles } from '../enums/roles.enum';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@admon.uniajc.edu.co',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'User role (student, tutor, admin)',
    example: Roles.Student,
    enum: Roles,
  })
  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.Student,
  })
  role: Roles;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({
    description: 'Profile picture URL',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @Column({ nullable: true })
  profilePicture: string;

  @ApiProperty({
    description: 'Brief bio of the user',
    example:
      'I am a math enthusiast looking for tutoring in advanced calculus.',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  bio: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-04-30T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-04-30T12:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}