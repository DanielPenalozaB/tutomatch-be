import { ApiProperty } from '@nestjs/swagger';
import { TutoringModality } from 'src/tutoring-sessions/enums/tutoring-modality.enum';

export class CreateTutoringOfferDto {
  @ApiProperty({
    description: 'ID of the subject being offered',
    example: 1,
  })
  subjectId: number;

  @ApiProperty({
    description: 'Modality of tutoring',
    example: TutoringModality.VIRTUAL,
    enum: TutoringModality,
  })
  modality: TutoringModality;

  @ApiProperty({
    description: 'Specific topics description',
    example: 'I can help with calculus basics, derivatives, and integrals',
    required: false,
  })
  topicsDescription?: string;

  @ApiProperty({
    description: 'Session type (individual or group)',
    example: 'individual',
  })
  sessionType: string;

  @ApiProperty({
    description: 'Location for presential sessions',
    example: 'University Library, Room 203',
    required: false,
  })
  location?: string;

  @ApiProperty({
    description: 'Meeting link for virtual sessions',
    example: 'https://meet.google.com/xyz-abc-def',
    required: false,
  })
  meetingLink?: string;

  @ApiProperty({
    description: 'Hourly rate for the tutoring',
    example: 15.5,
    required: false,
  })
  hourlyRate?: number;
}