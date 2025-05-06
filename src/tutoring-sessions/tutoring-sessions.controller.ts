import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TutoringSessionsService } from './tutoring-sessions.service';
import { CreateTutoringSessionDto } from './dto/create-tutoring-session.dto';
import { UpdateTutoringSessionDto } from './dto/update-tutoring-session.dto';

@Controller('tutoring-sessions')
export class TutoringSessionsController {
  constructor(private readonly tutoringSessionsService: TutoringSessionsService) {}

  @Post()
  create(@Body() createTutoringSessionDto: CreateTutoringSessionDto) {
    return this.tutoringSessionsService.create(createTutoringSessionDto);
  }

  @Get()
  findAll() {
    return this.tutoringSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutoringSessionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTutoringSessionDto: UpdateTutoringSessionDto) {
    return this.tutoringSessionsService.update(+id, updateTutoringSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutoringSessionsService.remove(+id);
  }
}
