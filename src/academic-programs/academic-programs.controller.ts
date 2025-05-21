import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AcademicProgramsService } from './academic-programs.service';
import { AcademicProgramResponseDto } from './dto/academic-program-response.dto';
import { CreateAcademicProgramDto } from './dto/create-academic-program.dto';
import { UpdateAcademicProgramDto } from './dto/update-academic-program.dto';
import { PaginatedResult, PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('Academic Programs')
@Controller('academic-programs')
export class AcademicProgramsController {
  constructor(private readonly academicProgramsService: AcademicProgramsService) {}

  @Post()
  @ApiBearerAuth()
  create(
    @Body() createAcademicProgramDto: CreateAcademicProgramDto,
  ): Promise<AcademicProgramResponseDto> {
    return this.academicProgramsService.create(createAcademicProgramDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResult<AcademicProgramResponseDto>> {
    return this.academicProgramsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AcademicProgramResponseDto> {
    return this.academicProgramsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateAcademicProgramDto: UpdateAcademicProgramDto,
  ): Promise<AcademicProgramResponseDto> {
    return this.academicProgramsService.update(+id, updateAcademicProgramDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string): Promise<void> {
    return this.academicProgramsService.remove(+id);
  }
}