import { Injectable } from '@nestjs/common';
import { CreateTutoringSessionDto } from './dto/create-tutoring-session.dto';
import { UpdateTutoringSessionDto } from './dto/update-tutoring-session.dto';

@Injectable()
export class TutoringSessionsService {
  create(createTutoringSessionDto: CreateTutoringSessionDto) {
    return 'This action adds a new tutoringSession';
  }

  findAll() {
    return `This action returns all tutoringSessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tutoringSession`;
  }

  update(id: number, updateTutoringSessionDto: UpdateTutoringSessionDto) {
    return `This action updates a #${id} tutoringSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} tutoringSession`;
  }
}
