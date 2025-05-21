import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Availability } from 'src/availabilities/entities/availability.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Report } from 'src/reports/entities/report.entity';
import { TutoringSession } from 'src/tutoring-sessions/entities/tutoring-session.entity';
import { TutorSubject } from 'src/tutors/entities/tutor-subject.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from '../enums/roles.enum';
import { TutoringOffer } from 'src/tutoring-offers/entities/tutoring-offers.entity';
import { AcademicProgram } from 'src/academic-programs/entities/academic-program.entity';

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
    example: 'I am a math enthusiast looking for tutoring in advanced calculus.',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  bio: string;

  @ApiProperty({
    description: 'Student code or identification',
    example: 'A12345',
    required: false,
  })
  @Column({ nullable: true, unique: true })
  studentCode: string;

  @ApiProperty({
    description: 'Academic program of the student',
    type: () => AcademicProgram,
    required: false,
  })
  @ManyToOne(() => AcademicProgram, program => program.students, { nullable: true })
  academicProgram: AcademicProgram | null;

  @ApiProperty({
    description: 'Semester of study',
    example: 5,
    required: false,
  })
  @Column({ nullable: true })
  semester: number;

  @ApiProperty({
    description: 'Is the user account verified?',
    example: false,
  })
  @Column({ default: false })
  isVerified: boolean;

  @Column({
    type: 'varchar',
    nullable: true
  })
  passwordResetToken?: string | null;

  @Column({
    type: 'timestamp with time zone',
    nullable: true
  })
  passwordResetExpires?: Date | null;

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

  @OneToMany(() => TutorSubject, tutorSubject => tutorSubject.tutor)
  tutorSubjects: TutorSubject[];

  @OneToMany(() => Availability, availability => availability.tutor)
  availabilities: Availability[];

  @OneToMany(() => TutoringSession, session => session.tutor)
  tutoringSessionsAsTutor: TutoringSession[];

  @ManyToMany(() => TutoringSession, session => session.student)
  tutoringSessionsAsStudent: TutoringSession[];

  @OneToMany(() => Notification, notification => notification.recipient)
  notifications: Notification[];

  @OneToMany(() => Message, message => message.sender)
  messages: Message[];

  @OneToMany(() => Report, report => report.generatedBy)
  generatedReports: Report[];

  @OneToMany(() => TutoringOffer, offer => offer.tutor)
  tutoringOffers: TutoringOffer[];
}
