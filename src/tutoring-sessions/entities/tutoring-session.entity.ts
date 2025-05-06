import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { SessionType } from '../enums/session-type.enum';
import { SessionStatus } from '../enums/session-status.enum';
import { Message } from 'src/messages/entities/message.entity';

@Entity('tutoring_sessions')
export class TutoringSession {
  @ApiProperty({
    description: 'The unique identifier of the tutoring session',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Tutor conducting the session',
    type: () => User,
  })
  @ManyToOne(() => User, user => user.tutoringSessionsAsTutor)
  tutor: User;

  @ApiProperty({
    description: 'Student attending the session',
    type: () => User,
  })
  @ManyToOne(() => User, user => user.tutoringSessionsAsStudent)
  student: User;

  @ApiProperty({
    description: 'Subject being tutored',
    type: () => Subject,
  })
  @ManyToOne(() => Subject, subject => subject.sessions)
  subject: Subject;

  @ApiProperty({
    description: 'Messages exchanged in this tutoring session',
    type: () => [Message],
  })
  @OneToMany(() => Message, message => message.session)
  messages: Message[];

  @ApiProperty({
    description: 'Scheduled date and time of the session',
    example: '2025-05-15T14:00:00Z',
  })
  @Column({ type: 'timestamp' })
  scheduledDate: Date;

  @ApiProperty({
    description: 'Duration of the session in minutes',
    example: 60,
  })
  @Column()
  duration: number;

  @ApiProperty({
    description: 'Session status',
    example: SessionStatus.Scheduled,
    enum: SessionStatus,
  })
  @Column({
    type: 'enum',
    enum: SessionStatus,
    default: SessionStatus.Scheduled,
  })
  status: SessionStatus;

  @ApiProperty({
    description: 'Session type (individual or group)',
    example: SessionType.Individual,
    enum: SessionType,
  })
  @Column({
    type: 'enum',
    enum: SessionType,
  })
  type: SessionType;

  @ApiProperty({
    description: 'Meeting link for virtual sessions',
    example: 'https://meet.google.com/xyz-abc-def',
    required: false,
  })
  @Column({ nullable: true })
  meetingLink: string;

  @ApiProperty({
    description: 'Physical location for in-person sessions',
    example: 'Biblioteca, Piso 2, Sala 3',
    required: false,
  })
  @Column({ nullable: true })
  location: string;

  @ApiProperty({
    description: 'Topics to be covered in the session',
    example: 'Derivadas, Regla de la cadena, Aplicaciones de derivadas',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  plannedTopics: string;

  @ApiProperty({
    description: 'Actual topics covered in the session',
    example: 'Derivadas básicas, Regla de la cadena',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  actualTopics: string;

  @ApiProperty({
    description: 'Student notes about the session',
    example: 'Necesito repasar más la regla de la cadena',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  studentNotes: string;

  @ApiProperty({
    description: 'Tutor notes about the session',
    example: 'El estudiante necesita practicar más ejercicios de aplicación',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  tutorNotes: string;

  @ApiProperty({
    description: 'Student rating of the session (1-5)',
    example: 4,
    required: false,
  })
  @Column({ type: 'smallint', nullable: true })
  studentRating: number;

  @ApiProperty({
    description: 'Student feedback about the session',
    example: 'El tutor explicó muy bien los conceptos, pero necesitamos más ejemplos prácticos',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  studentFeedback: string;

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