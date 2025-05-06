import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { NotificationType } from '../enums/notification-type.enum';

@Entity('notifications')
export class Notification {
  @ApiProperty({
    description: 'The unique identifier of the notification',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'User who receives the notification',
    type: () => User,
  })
  @ManyToOne(() => User, user => user.notifications)
  recipient: User;

  @ApiProperty({
    description: 'Notification title',
    example: 'Nueva solicitud de tutoría',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Notification message',
    example: 'Tienes una nueva solicitud de tutoría para Cálculo Diferencial',
  })
  @Column({ type: 'text' })
  message: string;

  @ApiProperty({
    description: 'Notification type',
    example: NotificationType.SessionRequest,
    enum: NotificationType,
  })
  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @ApiProperty({
    description: 'Is the notification read?',
    example: false,
  })
  @Column({ default: false })
  isRead: boolean;

  @ApiProperty({
    description: 'Related entity ID (e.g., session ID)',
    example: 123,
    required: false,
  })
  @Column({ nullable: true })
  relatedEntityId: number;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-04-30T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;
}