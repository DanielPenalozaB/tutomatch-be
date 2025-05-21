import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Subject } from 'src/subjects/entities/subject.entity';

@Entity('academic_areas')
export class AcademicArea {
  @ApiProperty({ description: 'The unique identifier', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Name of the academic area', example: 'Matemáticas' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ description: 'Code of the academic area', example: 'MAT' })
  @Column({ unique: true })
  code: string;

  @ApiProperty({
    description: 'Description of the academic area',
    example: 'Área dedicada a las matemáticas puras y aplicadas',
    required: false
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Whether the area is active', example: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Creation timestamp', example: '2025-04-30T12:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp', example: '2025-04-30T12:00:00Z' })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Subject, subject => subject.academicArea)
  subjects: Subject[];
}