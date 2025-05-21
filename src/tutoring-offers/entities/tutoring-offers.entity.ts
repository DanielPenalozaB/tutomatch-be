import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TutoringModality } from 'src/tutoring-sessions/enums/tutoring-modality.enum';

@Entity('tutoring_offers')
export class TutoringOffer {
  @ApiProperty({
    description: 'The unique identifier of the tutoring offer',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Tutor who created the offer',
    type: () => User,
  })
  @ManyToOne(() => User, user => user.tutoringOffers)
  tutor: User;

  @ApiProperty({
    description: 'Subject being offered for tutoring',
    type: () => Subject,
  })
  @ManyToOne(() => Subject, subject => subject.tutoringOffers)
  subject: Subject;

  @ApiProperty({
    description: 'Modality of tutoring (presential, virtual, mixed)',
    example: TutoringModality.VIRTUAL,
    enum: TutoringModality,
  })
  @Column({
    type: 'enum',
    enum: TutoringModality,
    default: TutoringModality.VIRTUAL,
  })
  modality: TutoringModality;

  @ApiProperty({
    description: 'Specific topics description',
    example: 'I can help with calculus basics, derivatives, and integrals',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  topicsDescription: string;

  @ApiProperty({
    description: 'Whether the offer is active and visible to students',
    example: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Session type (individual or group)',
    example: 'individual',
  })
  @Column({ default: 'individual' })
  sessionType: string;

  @ApiProperty({
    description: 'Location for presential sessions',
    example: 'University Library, Room 203',
    required: false,
  })
  @Column({ nullable: true })
  location: string;

  @ApiProperty({
    description: 'Meeting link for virtual sessions',
    example: 'https://meet.google.com/xyz-abc-def',
    required: false,
  })
  @Column({ nullable: true })
  meetingLink: string;

  @ApiProperty({
    description: 'Hourly rate for the tutoring',
    example: 15.5,
    required: false,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  hourlyRate: number;

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