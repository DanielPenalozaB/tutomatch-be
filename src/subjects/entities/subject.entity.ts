import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TutorSubject } from 'src/tutors/entities/tutor-subject.entity';
import { TutoringSession } from 'src/tutoring-sessions/entities/tutoring-session.entity';
import { TutoringOffer } from 'src/tutoring-offers/entities/tutoring-offers.entity';
import { AcademicArea } from 'src/academic-areas/entities/academic-area.entity';
import { AcademicProgram } from 'src/academic-programs/entities/academic-program.entity';

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
    description: 'Brief description of the subject',
    example: 'Introducción a los conceptos fundamentales del cálculo diferencial',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    description: 'Number of academic credits',
    example: 3,
  })
  @Column({ type: 'smallint' })
  credits: number;

  @ApiProperty({
    description: 'Semester when the subject is typically taken',
    example: 2,
  })
  @Column({ type: 'smallint' })
  semester: number;

  @ApiProperty({
    description: 'Whether the subject is currently active in the curriculum',
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

  @ApiProperty({
    description: 'Academic program this subject belongs to',
    type: () => AcademicProgram,
  })
  @ManyToOne(() => AcademicProgram, program => program.subjects)
  academicProgram: AcademicProgram;

  @ApiProperty({
    description: 'Academic area this subject belongs to',
    type: () => AcademicArea,
  })
  @ManyToOne(() => AcademicArea, area => area.subjects)
  academicArea: AcademicArea;

  @OneToMany(() => TutorSubject, tutorSubject => tutorSubject.subject)
  tutorSubjects: TutorSubject[];

  @OneToMany(() => TutoringSession, session => session.subject)
  sessions: TutoringSession[];

  @OneToMany(() => TutoringOffer, offer => offer.subject)
  tutoringOffers: TutoringOffer[];
}