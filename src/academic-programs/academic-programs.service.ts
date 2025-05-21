import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicProgram } from './entities/academic-program.entity';
import { CreateAcademicProgramDto } from './dto/create-academic-program.dto';
import { UpdateAcademicProgramDto } from './dto/update-academic-program.dto';
import { AcademicProgramResponseDto } from './dto/academic-program-response.dto';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult, PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class AcademicProgramsService {
  constructor(
    @InjectRepository(AcademicProgram)
    private readonly academicProgramRepository: Repository<AcademicProgram>,
  ) {}

  async create(createAcademicProgramDto: CreateAcademicProgramDto): Promise<AcademicProgramResponseDto> {
    await this.checkForDuplicates(createAcademicProgramDto.name, createAcademicProgramDto.code);

    const program = this.academicProgramRepository.create({
      ...createAcademicProgramDto,
      isActive: createAcademicProgramDto.isActive ?? true,
    });

    const savedProgram = await this.academicProgramRepository.save(program);
    return this.mapToResponseDto(savedProgram);
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<AcademicProgramResponseDto>> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this.academicProgramRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { name: 'ASC' },
    });

    return {
      data: data.map(program => this.mapToResponseDto(program)),
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<AcademicProgram> {
    const program = await this.academicProgramRepository.findOne({ where: { id } });

    if (!program) {
      throw new NotFoundException('Academic program not found');
    }

    return program;
  }

  async update(
    id: number,
    updateAcademicProgramDto: UpdateAcademicProgramDto,
  ): Promise<AcademicProgramResponseDto> {
    const program = await this.academicProgramRepository.findOne({ where: { id } });
    if (!program) {
      throw new NotFoundException('Academic program not found');
    }

    if (updateAcademicProgramDto.name || updateAcademicProgramDto.code) {
      await this.checkForDuplicates(
        updateAcademicProgramDto.name || program.name,
        updateAcademicProgramDto.code || program.code,
        id,
      );
    }

    if (updateAcademicProgramDto.toggleActive !== undefined) {
      program.isActive = updateAcademicProgramDto.toggleActive;
    }

    Object.assign(program, updateAcademicProgramDto);

    const updatedProgram = await this.academicProgramRepository.save(program);
    return this.mapToResponseDto(updatedProgram);
  }

  async remove(id: number): Promise<void> {
    const program = await this.academicProgramRepository.findOne({ 
      where: { id },
      relations: ['subjects', 'students'],
    });

    if (!program) {
      throw new NotFoundException('Academic program not found');
    }

    if (program.subjects.length > 0 || program.students.length > 0) {
      throw new ConflictException('Cannot delete program with associated subjects or students');
    }

    await this.academicProgramRepository.remove(program);
  }

  private async checkForDuplicates(name: string, code: string, excludeId?: number): Promise<void> {
    const query = this.academicProgramRepository
      .createQueryBuilder('program')
      .where('program.name = :name OR program.code = :code', { name, code });

    if (excludeId) {
      query.andWhere('program.id != :id', { id: excludeId });
    }

    const existing = await query.getOne();

    if (existing) {
      if (existing.name === name) {
        throw new ConflictException('A program with this name already exists');
      }
      if (existing.code === code) {
        throw new ConflictException('A program with this code already exists');
      }
    }
  }

  private mapToResponseDto(program: AcademicProgram): AcademicProgramResponseDto {
    return plainToInstance(AcademicProgramResponseDto, {
      id: program.id,
      name: program.name,
      code: program.code,
      totalSemesters: program.totalSemesters,
      isActive: program.isActive,
      createdAt: program.createdAt,
      updatedAt: program.updatedAt,
    });
  }
}