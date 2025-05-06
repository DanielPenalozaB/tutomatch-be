import { PartialType } from '@nestjs/swagger';
import { CreateTutoringSessionDto } from './create-tutoring-session.dto';

export class UpdateTutoringSessionDto extends PartialType(CreateTutoringSessionDto) {}
