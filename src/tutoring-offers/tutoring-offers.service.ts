import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTutoringOfferDto } from './dto/create-tutoring-offer.dto';
import { UpdateTutoringOfferDto } from './dto/update-tutoring-offer.dto';
import { User } from 'src/users/entities/user.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { TutoringOfferResponseDto } from './dto/tutoring-offer-response.dto';
import { TutoringOffer } from './entities/tutoring-offers.entity';
import { PaginatedResult, PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TutoringOffersService {
  constructor(
    @InjectRepository(TutoringOffer)
    private readonly tutoringOfferRepository: Repository<TutoringOffer>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(
    createTutoringOfferDto: CreateTutoringOfferDto,
    tutor: User,
  ): Promise<TutoringOfferResponseDto> {
    // Verify the subject exists
    const subject = await this.subjectRepository.findOne({
      where: { id: createTutoringOfferDto.subjectId },
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    // Create the offer
    const offer = this.tutoringOfferRepository.create({
      ...createTutoringOfferDto,
      tutor,
      subject,
    });

    const savedOffer = await this.tutoringOfferRepository.save(offer);
    return this.mapToResponseDto(savedOffer);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<TutoringOfferResponseDto>> {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this.tutoringOfferRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['tutor', 'subject'],
    });

    return {
      data: data.map(offer => this.mapToResponseDto(offer)),
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findByTutor(tutorId: number): Promise<TutoringOfferResponseDto[]> {
    const offers = await this.tutoringOfferRepository.find({
      where: { tutor: { id: tutorId } },
      relations: ['tutor', 'subject'],
    });
    return offers.map(offer => this.mapToResponseDto(offer));
  }

  async findOne(id: number): Promise<TutoringOfferResponseDto> {
    const offer = await this.tutoringOfferRepository.findOne({
      where: { id },
      relations: ['tutor', 'subject'],
    });
    if (!offer) {
      throw new NotFoundException('Tutoring offer not found');
    }
    return this.mapToResponseDto(offer);
  }

  async update(
    id: number,
    updateTutoringOfferDto: UpdateTutoringOfferDto,
    userId: number,
  ): Promise<TutoringOfferResponseDto> {
    const offer = await this.tutoringOfferRepository.findOne({
      where: { id },
      relations: ['tutor', 'subject'],
    });

    if (!offer) {
      throw new NotFoundException('Tutoring offer not found');
    }

    // Check if the user is the owner of the offer
    if (offer.tutor.id !== userId) {
      throw new ForbiddenException(
        'You can only update your own tutoring offers',
      );
    }

    // Update subject if needed
    if (updateTutoringOfferDto.subjectId) {
      const subject = await this.subjectRepository.findOne({
        where: { id: updateTutoringOfferDto.subjectId },
      });
      if (!subject) {
        throw new NotFoundException('Subject not found');
      }
      offer.subject = subject;
    }

    // Update other fields
    Object.assign(offer, updateTutoringOfferDto);

    const updatedOffer = await this.tutoringOfferRepository.save(offer);
    return this.mapToResponseDto(updatedOffer);
  }

  async toggleStatus(
    id: number,
    userId: number,
  ): Promise<TutoringOfferResponseDto> {
    const offer = await this.tutoringOfferRepository.findOne({
      where: { id },
      relations: ['tutor', 'subject'],
    });

    if (!offer) {
      throw new NotFoundException('Tutoring offer not found');
    }

    if (offer.tutor.id !== userId) {
      throw new ForbiddenException(
        'You can only update your own tutoring offers',
      );
    }

    offer.isActive = !offer.isActive;
    const updatedOffer = await this.tutoringOfferRepository.save(offer);
    return this.mapToResponseDto(updatedOffer);
  }

  async remove(id: number, userId: number): Promise<void> {
    const offer = await this.tutoringOfferRepository.findOne({
      where: { id },
      relations: ['tutor', 'subject'],
    });

    if (!offer) {
      throw new NotFoundException('Tutoring offer not found');
    }

    if (offer.tutor.id !== userId) {
      throw new ForbiddenException(
        'You can only delete your own tutoring offers',
      );
    }

    await this.tutoringOfferRepository.remove(offer);
  }

  private mapToResponseDto(offer: TutoringOffer): TutoringOfferResponseDto {
    return {
      id: offer.id,
      subjectId: offer.subject.id,
      subjectName: offer.subject.name,
      modality: offer.modality,
      topicsDescription: offer.topicsDescription,
      isActive: offer.isActive,
      sessionType: offer.sessionType,
      location: offer.location,
      meetingLink: offer.meetingLink,
      hourlyRate: offer.hourlyRate,
      tutorId: offer.tutor.id,
      tutorName: offer.tutor.name,
      tutorProfilePicture: offer.tutor.profilePicture,
      createdAt: offer.createdAt,
      updatedAt: offer.updatedAt,
    };
  }
}