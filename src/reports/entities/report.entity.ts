import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { ReportType } from '../enums/report-type.enum';

@Entity('reports')
export class Report {
  @ApiProperty({
    description: 'The unique identifier of the report',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Admin who generated the report',
    type: () => User,
  })
  @ManyToOne(() => User, user => user.generatedReports)
  generatedBy: User;

  @ApiProperty({
    description: 'Report type',
    example: ReportType.TutoringStats,
    enum: ReportType,
  })
  @Column({
    type: 'enum',
    enum: ReportType,
  })
  type: ReportType;

  @ApiProperty({
    description: 'Report title',
    example: 'Estadísticas de tutorías - Mayo 2025',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Report description',
    example: 'Resumen de todas las tutorías realizadas en el mes de mayo',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    description: 'Report data in JSON format',
    example: { totalSessions: 150, averageRating: 4.2 },
  })
  @Column({ type: 'jsonb' })
  data: any;

  @ApiProperty({
    description: 'Start date of the report period',
    example: '2025-05-01T00:00:00Z',
    required: false,
  })
  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @ApiProperty({
    description: 'End date of the report period',
    example: '2025-05-31T23:59:59Z',
    required: false,
  })
  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-06-01T10:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;
}