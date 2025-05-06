import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ExperienceLevel } from '../enums/experience-level.enum';
import { TutoringModality } from '../enums/tutoring-modality.enum';

export class UpdateTutoringSessionDto {
  @ApiProperty({
    description: 'Title of the tutoring offer',
    example: 'Ayuda en cálculo diferencial e integral',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title?: string;

  @ApiProperty({
    description: 'Detailed description of the tutoring offer',
    example: 'Ofrezco apoyo con derivadas, integrales, límites y aplicaciones prácticas',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(20)
  description?: string;

  @ApiProperty({
    description: 'Specific topics covered in the tutoring offer',
    example: 'Derivadas, integrales, límites, series, aplicaciones en física',
    required: false,
  })
  @IsOptional()
  @IsString()
  specificTopics?: string;

  @ApiProperty({
    description: 'Tutoring modality (presential, virtual, mixed)',
    example: TutoringModality.MIXED,
    enum: TutoringModality,
    required: false,
  })
  @IsOptional()
  @IsEnum(TutoringModality)
  modality?: TutoringModality;

  @ApiProperty({
    description: 'Experience level in the subject',
    example: ExperienceLevel.Advanced,
    enum: ExperienceLevel,
    required: false,
  })
  @IsOptional()
  @IsEnum(ExperienceLevel)
  experienceLevel?: ExperienceLevel;

  @ApiProperty({
    description: 'IDs of subjects offered for tutoring',
    example: [1, 2, 3],
    type: [Number],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  subjectIds?: number[];

  @ApiProperty({
    description: 'Tags or keywords for the tutoring offer',
    example: ['cálculo', 'matemáticas', 'derivadas', 'integrales'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({
    description: 'Whether the tutoring offer is currently active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Physical location for presential tutoring (if applicable)',
    example: 'Biblioteca Central, Sala de Estudio 2',
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'Virtual meeting platform (if applicable)',
    example: 'Google Meet, Zoom',
    required: false,
  })
  @IsOptional()
  @IsString()
  virtualPlatform?: string;
}
