import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Availability } from 'src/availabilities/entities/availability.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TutorsService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>
  ) { }
  
  create(createTutorDto: CreateTutorDto) {
    return 'This action adds a new tutor';
  }

  findAll() {
    return `This action returns all tutors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tutor`;
  }

  update(id: number, updateTutorDto: UpdateTutorDto) {
    return `This action updates a #${id} tutor`;
  }

  async remove(id: number): Promise<void> {
  const result = await this.availabilityRepository.delete(id);

  if (result.affected === 0) {
    throw new NotFoundException(`No availability found with ID ${id}`);
  }
}
}
