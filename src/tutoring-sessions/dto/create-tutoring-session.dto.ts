import { ApiProperty } from '@nestjs/swagger';
import { SessionType } from '../enums/session-type.enum';

export class CreateTutoringSessionDto {
  @ApiProperty()
  tutorId: number;

  @ApiProperty()
  studentId: number;

  @ApiProperty()
  subjectId: number;

  @ApiProperty()
  scheduledDate: string; // ISO string

  @ApiProperty()
  duration: number;

  @ApiProperty({ enum: SessionType })
  type: SessionType;

  @ApiProperty({ required: false })
  meetingLink?: string;

  @ApiProperty({ required: false })
  location?: string;

  @ApiProperty()
  plannedTopics: string;
}
