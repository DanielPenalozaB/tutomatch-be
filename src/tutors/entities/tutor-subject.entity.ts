import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Subject } from 'src/subjects/entities/subject.entity';

@Entity('tutor_subjects')
export class TutorSubject {
  @ApiProperty({
    description: 'The unique identifier of the tutor-subject relationship',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Tutor who can teach this subject',
    type: () => User,
  })
  @ManyToOne(() => User, user => user.tutorSubjects)
  tutor: User;

  @ApiProperty({
    description: 'Subject that the tutor can teach',
    type: () => Subject,
  })
  @ManyToOne(() => Subject, subject => subject.tutorSubjects)
  subject: Subject;

  @ApiProperty({
    description: 'Tutor proficiency level in this subject (1-5)',
    example: 4,
  })
  @Column({ type: 'smallint' })
  proficiencyLevel: number;

  @ApiProperty({
    description: 'Is this subject verified by admin?',
    example: false,
  })
  @Column({ default: false })
  isVerified: boolean;

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