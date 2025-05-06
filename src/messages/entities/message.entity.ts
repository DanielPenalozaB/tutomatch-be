import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TutoringSession } from 'src/tutoring-sessions/entities/tutoring-session.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('messages')
export class Message {
  @ApiProperty({
    description: 'The unique identifier of the message',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Tutoring session related to this message',
    type: () => TutoringSession,
  })
  @ManyToOne(() => TutoringSession, session => session.messages)
  session: TutoringSession;

  @ApiProperty({
    description: 'User who sent the message',
    type: () => User,
  })
  @ManyToOne(() => User, user => user.messages)
  sender: User;

  @ApiProperty({
    description: 'Message content',
    example: 'Hola, ¿qué temas te gustaría repasar en nuestra próxima sesión?',
  })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({
    description: 'Is the message read by the recipient?',
    example: false,
  })
  @Column({ default: false })
  isRead: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-04-30T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;
}