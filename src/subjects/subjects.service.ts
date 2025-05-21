import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectResponseDto } from './dto/subject-response.dto';
import { AcademicProgram } from 'src/academic-programs/entities/academic-program.entity';
import { AcademicArea } from 'src/academic-areas/entities/academic-area.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(AcademicProgram)
    private academicProgramRepository: Repository<AcademicProgram>,
    @InjectRepository(AcademicArea)
    private academicAreaRepository: Repository<AcademicArea>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<SubjectResponseDto> {
    // Check for duplicate name or code
    await this.checkForDuplicates(createSubjectDto.name, createSubjectDto.code);

    // Verify academic program exists
    const academicProgram = await this.academicProgramRepository.findOne({
      where: { id: createSubjectDto.academicProgramId },
    });
    if (!academicProgram) {
      throw new NotFoundException('Academic program not found');
    }

    // Verify academic area exists
    const academicArea = await this.academicAreaRepository.findOne({
      where: { id: createSubjectDto.academicAreaId },
    });
    if (!academicArea) {
      throw new NotFoundException('Academic area not found');
    }

    // Create the subject
    const subject = this.subjectRepository.create({
      ...createSubjectDto,
      academicProgram,
      academicArea,
    });

    const savedSubject = await this.subjectRepository.save(subject);
    return this.mapToResponseDto(savedSubject);
  }

  async findAll(): Promise<SubjectResponseDto[]> {
    const subjects = await this.subjectRepository.find({
      relations: ['academicProgram', 'academicArea'],
    });

    return subjects.map(subject => this.mapToResponseDto(subject));
  }

  async findOne(id: number): Promise<SubjectResponseDto> {
    const subject = await this.subjectRepository.findOne({
      where: { id },
      relations: ['academicProgram', 'academicArea'],
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    return this.mapToResponseDto(subject);
  }

  async update(
    id: number,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<SubjectResponseDto> {
    const subject = await this.subjectRepository.findOne({
      where: { id },
      relations: ['academicProgram', 'academicArea'],
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    // Check for duplicates if name or code is being updated
    if (updateSubjectDto.name || updateSubjectDto.code) {
      await this.checkForDuplicates(
        updateSubjectDto.name || subject.name,
        updateSubjectDto.code || subject.code,
        id,
      );
    }

    // Handle academic program update if needed
    if (updateSubjectDto.academicProgramId) {
      const academicProgram = await this.academicProgramRepository.findOne({
        where: { id: updateSubjectDto.academicProgramId },
      });
      if (!academicProgram) {
        throw new NotFoundException('Academic program not found');
      }
      subject.academicProgram = academicProgram;
    }

    // Handle academic area update if needed
    if (updateSubjectDto.academicAreaId) {
      const academicArea = await this.academicAreaRepository.findOne({
        where: { id: updateSubjectDto.academicAreaId },
      });
      if (!academicArea) {
        throw new NotFoundException('Academic area not found');
      }
      subject.academicArea = academicArea;
    }

    // Handle toggle active if specified
    if (updateSubjectDto.toggleActive !== undefined) {
      subject.isActive = updateSubjectDto.toggleActive;
    }

    // Update other fields
    Object.assign(subject, updateSubjectDto);

    const updatedSubject = await this.subjectRepository.save(subject);
    return this.mapToResponseDto(updatedSubject);
  }

  async remove(id: number): Promise<void> {
    const subject = await this.subjectRepository.findOne({
      where: { id },
      relations: ['tutorSubjects', 'sessions', 'tutoringOffers'],
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    // Check if subject is being used in any relationships
    if (
      subject.tutorSubjects.length > 0 ||
      subject.sessions.length > 0 ||
      subject.tutoringOffers.length > 0
    ) {
      throw new BadRequestException(
        'Cannot delete subject as it is associated with tutors, sessions, or offers',
      );
    }

    await this.subjectRepository.remove(subject);
  }

  private async checkForDuplicates(
    name: string,
    code: string,
    excludeId?: number,
  ): Promise<void> {
    const query = this.subjectRepository
      .createQueryBuilder('subject')
      .where('subject.name = :name OR subject.code = :code', { name, code });

    if (excludeId) {
      query.andWhere('subject.id != :id', { id: excludeId });
    }

    const existing = await query.getOne();

    if (existing) {
      if (existing.name === name) {
        throw new ConflictException('A subject with this name already exists');
      }
      if (existing.code === code) {
        throw new ConflictException('A subject with this code already exists');
      }
    }
  }

  private mapToResponseDto(subject: Subject): SubjectResponseDto {
    return plainToInstance(SubjectResponseDto, {
      id: subject.id,
      name: subject.name,
      code: subject.code,
      description: subject.description,
      credits: subject.credits,
      semester: subject.semester,
      isActive: subject.isActive,
      academicProgram: subject.academicProgram,
      academicArea: subject.academicArea,
      createdAt: subject.createdAt,
      updatedAt: subject.updatedAt,
    });
  }
}