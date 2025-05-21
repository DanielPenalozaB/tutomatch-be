import { ApiProperty } from '@nestjs/swagger';
import { TutoringModality } from 'src/tutoring-sessions/enums/tutoring-modality.enum';

export class TutoringOfferResponseDto {
  @ApiProperty({ description: 'Offer ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Subject ID', example: 1 })
  subjectId: number;

  @ApiProperty({ description: 'Subject name', example: 'Calculus I' })
  subjectName: string;

  @ApiProperty({
    description: 'Modality of tutoring',
    example: TutoringModality.VIRTUAL,
    enum: TutoringModality,
  })
  modality: TutoringModality;

  @ApiProperty({
    description: 'Specific topics description',
    example: 'I can help with calculus basics, derivatives, and integrals',
    nullable: true,
  })
  topicsDescription: string | null;

  @ApiProperty({ description: 'Whether the offer is active', example: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Session type (individual or group)',
    example: 'individual',
  })
  sessionType: string;

  @ApiProperty({
    description: 'Location for presential sessions',
    example: 'University Library, Room 203',
    nullable: true,
  })
  location: string | null;

  @ApiProperty({
    description: 'Meeting link for virtual sessions',
    example: 'https://meet.google.com/xyz-abc-def',
    nullable: true,
  })
  meetingLink: string | null;

  @ApiProperty({
    description: 'Hourly rate for the tutoring',
    example: 15.5,
    nullable: true,
  })
  hourlyRate: number | null;

  @ApiProperty({
    description: 'Tutor ID',
    example: 1,
  })
  tutorId: number;

  @ApiProperty({
    description: 'Tutor name',
    example: 'John Doe',
  })
  tutorName: string;

  @ApiProperty({
    description: 'Tutor profile picture URL',
    example: 'https://example.com/profile.jpg',
    nullable: true,
  })
  tutorProfilePicture: string | null;

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