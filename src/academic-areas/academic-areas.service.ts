import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicArea } from './entities/academic-area.entity';
import { CreateAcademicAreaDto } from './dto/create-academic-area.dto';
import { UpdateAcademicAreaDto } from './dto/update-academic-area.dto';
import { AcademicAreaResponseDto } from './dto/academic-area-response.dto';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult, PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class AcademicAreasService {
  constructor(
    @InjectRepository(AcademicArea)
    private readonly academicAreaRepository: Repository<AcademicArea>,
  ) {}

  async create(createAcademicAreaDto: CreateAcademicAreaDto): Promise<AcademicAreaResponseDto> {
    await this.checkForDuplicates(createAcademicAreaDto.name, createAcademicAreaDto.code);

    const area = this.academicAreaRepository.create({
      ...createAcademicAreaDto,
      isActive: createAcademicAreaDto.isActive ?? true,
    });

    const savedArea = await this.academicAreaRepository.save(area);
    return this.mapToResponseDto(savedArea);
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<AcademicAreaResponseDto>> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this.academicAreaRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { name: 'ASC' },
    });

    return {
      data: data.map(area => this.mapToResponseDto(area)),
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<AcademicAreaResponseDto> {
    const area = await this.academicAreaRepository.findOne({ where: { id } });
    if (!area) {
      throw new NotFoundException('Academic area not found');
    }
    return this.mapToResponseDto(area);
  }

  async update(
    id: number,
    updateAcademicAreaDto: UpdateAcademicAreaDto,
  ): Promise<AcademicAreaResponseDto> {
    const area = await this.academicAreaRepository.findOne({ where: { id } });
    if (!area) {
      throw new NotFoundException('Academic area not found');
    }

    if (updateAcademicAreaDto.name || updateAcademicAreaDto.code) {
      await this.checkForDuplicates(
        updateAcademicAreaDto.name || area.name,
        updateAcademicAreaDto.code || area.code,
        id,
      );
    }

    if (updateAcademicAreaDto.toggleActive !== undefined) {
      area.isActive = updateAcademicAreaDto.toggleActive;
    }

    Object.assign(area, updateAcademicAreaDto);

    const updatedArea = await this.academicAreaRepository.save(area);
    return this.mapToResponseDto(updatedArea);
  }

  async remove(id: number): Promise<void> {
    const area = await this.academicAreaRepository.findOne({ 
      where: { id },
      relations: ['subjects'],
    });

    if (!area) {
      throw new NotFoundException('Academic area not found');
    }

    if (area.subjects && area.subjects.length > 0) {
      throw new ConflictException('Cannot delete area with associated subjects');
    }

    await this.academicAreaRepository.remove(area);
  }

  private async checkForDuplicates(name: string, code: string, excludeId?: number): Promise<void> {
    const query = this.academicAreaRepository
      .createQueryBuilder('area')
      .where('area.name = :name OR area.code = :code', { name, code });

    if (excludeId) {
      query.andWhere('area.id != :id', { id: excludeId });
    }

    const existing = await query.getOne();

    if (existing) {
      if (existing.name === name) {
        throw new ConflictException('An area with this name already exists');
      }
      if (existing.code === code) {
        throw new ConflictException('An area with this code already exists');
      }
    }
  }

  private mapToResponseDto(area: AcademicArea): AcademicAreaResponseDto {
    return plainToInstance(AcademicAreaResponseDto, {
      id: area.id,
      name: area.name,
      code: area.code,
      description: area.description,
      isActive: area.isActive,
      createdAt: area.createdAt,
      updatedAt: area.updatedAt,
    });
  }
}