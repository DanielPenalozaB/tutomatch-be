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
import { AcademicAreasService } from './academic-areas.service';
import { AcademicAreaResponseDto } from './dto/academic-area-response.dto';
import { CreateAcademicAreaDto } from './dto/create-academic-area.dto';
import { UpdateAcademicAreaDto } from './dto/update-academic-area.dto';
import { PaginatedResult, PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('Academic Areas')
@Controller('academic-areas')
export class AcademicAreasController {
  constructor(private readonly academicAreasService: AcademicAreasService) {}

  @Post()
  @ApiBearerAuth()
  create(
    @Body() createAcademicAreaDto: CreateAcademicAreaDto,
  ): Promise<AcademicAreaResponseDto> {
    return this.academicAreasService.create(createAcademicAreaDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResult<AcademicAreaResponseDto>> {
    return this.academicAreasService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AcademicAreaResponseDto> {
    return this.academicAreasService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateAcademicAreaDto: UpdateAcademicAreaDto,
  ): Promise<AcademicAreaResponseDto> {
    return this.academicAreasService.update(+id, updateAcademicAreaDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string): Promise<void> {
    return this.academicAreasService.remove(+id);
  }
}