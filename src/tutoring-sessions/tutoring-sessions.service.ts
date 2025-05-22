import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TutoringSession } from './entities/tutoring-session.entity';
import { CreateTutoringSessionDto } from './dto/create-tutoring-session.dto';
import { UpdateTutoringSessionDto } from './dto/update-tutoring-session.dto';


@Injectable()
export class TutoringSessionsService {
  constructor(
    @InjectRepository(TutoringSession)
    private readonly tutoringSessionRepo: Repository<TutoringSession>,
  ) { }

  async create(createTutoringSessionDto: CreateTutoringSessionDto) {
    // Transformar el DTO en un objeto aceptado por la entidad
    const session = this.tutoringSessionRepo.create({
      // Relacionar por id usando objetos "fake" para las relaciones
      tutor: { id: createTutoringSessionDto.tutorId } as any,
      student: { id: createTutoringSessionDto.studentId } as any,
      subject: { id: createTutoringSessionDto.subjectId } as any,
      scheduledDate: new Date(createTutoringSessionDto.scheduledDate),
      duration: createTutoringSessionDto.duration,
      type: createTutoringSessionDto.type as any, // Si tu enum es compatible, si no, haz la conversión aquí
      meetingLink: createTutoringSessionDto.meetingLink,
      location: createTutoringSessionDto.location,
      plannedTopics: createTutoringSessionDto.plannedTopics,
    });
    await this.tutoringSessionRepo.save(session);
    console.log(session);
    return session;
  }

  findAll() {
    return this.tutoringSessionRepo.find();
  }

  findOne(id: number) {
    return this.tutoringSessionRepo.findOne({ where: { id } });
  }

  async update(id: number, updateDto: any) {
    await this.tutoringSessionRepo.update(id, updateDto);
    return this.tutoringSessionRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.tutoringSessionRepo.delete(id);
    return { deleted: true };
  }
}