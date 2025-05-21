import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { TutoringOffersService } from './tutoring-offers.service';
import { CreateTutoringOfferDto } from './dto/create-tutoring-offer.dto';
import { UpdateTutoringOfferDto } from './dto/update-tutoring-offer.dto';
import { TutoringOfferResponseDto } from './dto/tutoring-offer-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { PaginatedResult, PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('Tutoring Offers')
@Controller('tutoring-offers')
export class TutoringOffersController {
  constructor(private readonly tutoringOffersService: TutoringOffersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The tutoring offer has been successfully created.',
    type: TutoringOfferResponseDto,
  })
  create(
    @Body() createTutoringOfferDto: CreateTutoringOfferDto,
    @Request() req,
  ): Promise<TutoringOfferResponseDto> {
    return this.tutoringOffersService.create(
      createTutoringOfferDto,
      req.user,
    );
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of all active tutoring offers',
    type: [TutoringOfferResponseDto],
  })
  findAllActive(@Query() paginationDto: PaginationDto): Promise<PaginatedResult<TutoringOfferResponseDto>> {
    return this.tutoringOffersService.findAll(paginationDto);
  }

  @Get('my-offers')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'List of tutoring offers created by the current tutor',
    type: [TutoringOfferResponseDto],
  })
  findByTutor(@Request() req): Promise<TutoringOfferResponseDto[]> {
    return this.tutoringOffersService.findByTutor(req.user.id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The tutoring offer with the given ID',
    type: TutoringOfferResponseDto,
  })
  findOne(@Param('id') id: string): Promise<TutoringOfferResponseDto> {
    return this.tutoringOffersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The tutoring offer has been successfully updated.',
    type: TutoringOfferResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateTutoringOfferDto: UpdateTutoringOfferDto,
    @Request() req,
  ): Promise<TutoringOfferResponseDto> {
    return this.tutoringOffersService.update(
      +id,
      updateTutoringOfferDto,
      req.user.id,
    );
  }

  @Patch(':id/toggle-status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The tutoring offer status has been toggled.',
    type: TutoringOfferResponseDto,
  })
  toggleStatus(
    @Param('id') id: string,
    @Request() req,
  ): Promise<TutoringOfferResponseDto> {
    return this.tutoringOffersService.toggleStatus(+id, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The tutoring offer has been successfully deleted.',
  })
  remove(@Param('id') id: string, @Request() req): Promise<void> {
    return this.tutoringOffersService.remove(+id, req.user.id);
  }
}