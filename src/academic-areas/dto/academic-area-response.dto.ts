import { ApiProperty } from '@nestjs/swagger';

export class AcademicAreaResponseDto {
  @ApiProperty({ description: 'Area ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Area name', example: 'Matemáticas' })
  name: string;

  @ApiProperty({ description: 'Area code', example: 'MAT' })
  code: string;

  @ApiProperty({
    description: 'Area description',
    example: 'Área dedicada a las matemáticas puras y aplicadas',
    nullable: true
  })
  description: string | null;

  @ApiProperty({ description: 'Whether area is active', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Creation timestamp', example: '2025-04-30T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp', example: '2025-04-30T12:00:00Z' })
  updatedAt: Date;
}