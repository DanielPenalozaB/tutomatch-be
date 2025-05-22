import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectResponseDto } from './dto/subject-response.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectsService } from './subjects.service';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createSubjectDto: CreateSubjectDto): Promise<SubjectResponseDto> {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  findAll(): Promise<SubjectResponseDto[]> {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SubjectResponseDto> {
    return this.subjectsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Promise<SubjectResponseDto> {
    return this.subjectsService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string): Promise<void> {
    return this.subjectsService.remove(+id);
  }
}
