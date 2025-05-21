import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Subject } from 'src/subjects/entities/subject.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('academic_programs')
export class AcademicProgram {
  @ApiProperty({ description: 'The unique identifier', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Name of the program', example: 'Ingeniería de Sistemas' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ description: 'Code of the program', example: 'IS' })
  @Column({ unique: true })
  code: string;

  @ApiProperty({ description: 'Number of semesters in the program', example: 10 })
  @Column({ type: 'smallint' })
  totalSemesters: number;

  @ApiProperty({ description: 'Whether the program is active', example: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Creation timestamp', example: '2025-04-30T12:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp', example: '2025-04-30T12:00:00Z' })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Subject, subject => subject.academicProgram)
  subjects: Subject[];

  @OneToMany(() => User, user => user.academicProgram)
  students: User[];
}