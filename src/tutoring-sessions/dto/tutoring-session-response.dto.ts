import { ApiProperty } from '@nestjs/swagger';
import { TutoringModality } from '../enums/tutoring-modality.enum';
import { ExperienceLevel } from '../enums/experience-level.enum';
import { User } from 'src/users/entities/user.entity';
import { Subject } from 'src/subjects/entities/subject.entity';

export class TutoringSessionResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the tutoring offer',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Title of the tutoring offer',
    example: 'Ayuda en cálculo diferencial e integral',
  })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the tutoring offer',
    example: 'Ofrezco apoyo con derivadas, integrales, límites y aplicaciones prácticas',
  })
  description: string;

  @ApiProperty({
    description: 'Specific topics covered in the tutoring offer',
    example: 'Derivadas, integrales, límites, series, aplicaciones en física',
  })
  specificTopics: string;

  @ApiProperty({
    description: 'Tutoring modality (presential, virtual, mixed)',
    example: TutoringModality.MIXED,
    enum: TutoringModality,
  })
  modality: TutoringModality;

  @ApiProperty({
    description: 'Experience level in the subject',
    example: ExperienceLevel.Advanced,
    enum: ExperienceLevel,
  })
  experienceLevel: ExperienceLevel;

  @ApiProperty({
    description: 'Tags or keywords for the tutoring offer',
    example: ['cálculo', 'matemáticas', 'derivadas', 'integrales'],
  })
  tags: string[];

  @ApiProperty({
    description: 'Whether the tutoring offer is currently active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Physical location for presential tutoring (if applicable)',
    example: 'Biblioteca Central, Sala de Estudio 2',
    required: false,
  })
  location?: string;

  @ApiProperty({
    description: 'Virtual meeting platform (if applicable)',
    example: 'Google Meet, Zoom',
    required: false,
  })
  virtualPlatform?: string;

  @ApiProperty({
    description: 'Tutor information',
    type: () => Object,
  })
  tutor: Partial<User>;

  @ApiProperty({
    description: 'Subjects offered for tutoring',
    type: () => [Object],
  })
  subjects: Partial<Subject>[];

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-04-30T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-04-30T12:00:00Z',
  })
  updatedAt: Date;
}