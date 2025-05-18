import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Availability } from 'src/availabilities/entities/availability.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AvailabilitiesService {
  constructor(
    @InjectRepository(Availability)
    private readonly availabilityRepository: Repository<Availability>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability> {
  const { tutorId, day, startTime, endTime, ...rest } = createAvailabilityDto;

  const tutor = await this.userRepository.findOne({
    where: { id: tutorId },
  });

  if (!tutor) {
    throw new NotFoundException(`Tutor with ID ${tutorId} not found`);
  }

  //VALIDACIÓN DE CONFLICTO DE HORARIOS
  const conflictingAvailabilities = await this.availabilityRepository
    .createQueryBuilder('availability')
    .where('availability.tutorId = :tutorId', { tutorId })
    .andWhere('availability.day = :day', { day })
    .andWhere('availability.startTime < :endTime AND availability.endTime > :startTime', {
      startTime,
      endTime,
    })
    .getMany();

  if (conflictingAvailabilities.length > 0) {
    throw new Error('Ya existe una disponibilidad que se cruza con este horario');
  }

  const availability = this.availabilityRepository.create({
    tutor,
    day,
    startTime,
    endTime,
    ...rest,
  });

  return this.availabilityRepository.save(availability);
}

  async findAll(): Promise<Availability[]> {
  return this.availabilityRepository.find({
    relations: ['tutor'], // para que incluya la info del tutor
  });
}

  async findOne(id: number): Promise<Availability> {
  const availability = await this.availabilityRepository.findOne({
    where: { id },
    relations: ['tutor'], // incluir relación tutor
  });

  if (!availability) {
    throw new NotFoundException(`Availability with ID ${id} not found`);
  }

  return availability;
}

  async update(id: number, updateAvailabilityDto: UpdateAvailabilityDto): Promise<Availability> {
  const availability = await this.findOne(id); // validación incluida

  if (updateAvailabilityDto.tutorId) {
    const tutor = await this.userRepository.findOne({
      where: { id: updateAvailabilityDto.tutorId },
    });

    if (!tutor) {
      throw new NotFoundException(`Tutor with ID ${updateAvailabilityDto.tutorId} not found`);
    }

    availability.tutor = tutor;
  }

  Object.assign(availability, updateAvailabilityDto);
  return this.availabilityRepository.save(availability);
}

  async remove(id: number): Promise<void> {
    const result = await this.availabilityRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`No availability found with ID ${id}`);
    }
  }
}
