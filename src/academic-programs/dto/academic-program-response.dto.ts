import { ApiProperty } from '@nestjs/swagger';

export class AcademicProgramResponseDto {
  @ApiProperty({ description: 'Program ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Program name', example: 'Ingeniería de Sistemas' })
  name: string;

  @ApiProperty({ description: 'Program code', example: 'IS' })
  code: string;

  @ApiProperty({ description: 'Total semesters', example: 10 })
  totalSemesters: number;

  @ApiProperty({ description: 'Whether program is active', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Creation timestamp', example: '2025-04-30T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp', example: '2025-04-30T12:00:00Z' })
  updatedAt: Date;
}