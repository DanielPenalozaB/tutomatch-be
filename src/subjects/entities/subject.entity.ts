import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TutorSubject } from 'src/tutors/entities/tutor-subject.entity';
import { TutoringSession } from 'src/tutoring-sessions/entities/tutoring-session.entity';

@Entity('subjects')
export class Subject {
  @ApiProperty({
    description: 'The unique identifier of the subject',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the subject',
    example: 'Cálculo Diferencial',
  })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    description: 'Subject code',
    example: 'MAT-101',
  })
  @Column({ unique: true })
  code: string;

  @ApiProperty({
    description: 'Academic area to which the subject belongs',
    example: 'Matemáticas',
  })
  @Column()
  area: string;

  @ApiProperty({
    description: 'Brief description of the subject',
    example: 'Introducción a los conceptos fundamentales del cálculo diferencial',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

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

  @OneToMany(() => TutorSubject, tutorSubject => tutorSubject.subject)
  tutorSubjects: TutorSubject[];

  @OneToMany(() => TutoringSession, session => session.subject)
  sessions: TutoringSession[];
}