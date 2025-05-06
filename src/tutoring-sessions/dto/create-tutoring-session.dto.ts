import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsArray, IsOptional, IsBoolean, ArrayMinSize, MaxLength, MinLength } from 'class-validator';
import { TutoringModality } from '../enums/tutoring-modality.enum';
import { ExperienceLevel } from '../enums/experience-level.enum';

export class CreateTutoringSessionDto {
  @ApiProperty({
    description: 'Title of the tutoring offer',
    example: 'Ayuda en cálculo diferencial e integral',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @ApiProperty({
    description: 'Detailed description of the tutoring offer',
    example: 'Ofrezco apoyo con derivadas, integrales, límites y aplicaciones prácticas',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  description: string;

  @ApiProperty({
    description: 'Specific topics covered in the tutoring offer',
    example: 'Derivadas, integrales, límites, series, aplicaciones en física',
  })
  @IsNotEmpty()
  @IsString()
  specificTopics: string;

  @ApiProperty({
    description: 'Tutoring modality (presential, virtual, mixed)',
    example: TutoringModality.MIXED,
    enum: TutoringModality,
  })
  @IsNotEmpty()
  @IsEnum(TutoringModality)
  modality: TutoringModality;

  @ApiProperty({
    description: 'Experience level in the subject',
    example: ExperienceLevel.Advanced,
    enum: ExperienceLevel,
  })
  @IsNotEmpty()
  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @ApiProperty({
    description: 'IDs of subjects offered for tutoring',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  subjectIds: number[];

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
