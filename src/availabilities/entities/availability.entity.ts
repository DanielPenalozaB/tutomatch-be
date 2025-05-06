import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { DayOfWeek } from '../enums/day-of-week.enum';

@Entity('availabilities')
export class Availability {
  @ApiProperty({
    description: 'The unique identifier of the availability slot',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Tutor who owns this availability',
    type: () => User,
  })
  @ManyToOne(() => User, user => user.availabilities)
  tutor: User;

  @ApiProperty({
    description: 'Day of the week',
    example: DayOfWeek.Monday,
    enum: DayOfWeek,
  })
  @Column({
    type: 'enum',
    enum: DayOfWeek,
  })
  day: DayOfWeek;

  @ApiProperty({
    description: 'Start time of availability (HH:mm)',
    example: '09:00',
  })
  @Column()
  startTime: string;

  @ApiProperty({
    description: 'End time of availability (HH:mm)',
    example: '11:00',
  })
  @Column()
  endTime: string;

  @ApiProperty({
    description: 'Is this availability active?',
    example: true,
  })
  @Column({ default: true })
  isActive: boolean;

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