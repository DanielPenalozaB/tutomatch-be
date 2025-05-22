import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { AcademicProgramsModule } from 'src/academic-programs/academic-programs.module';
import { AcademicAreasModule } from 'src/academic-areas/academic-areas.module';
import { AcademicProgram } from 'src/academic-programs/entities/academic-program.entity';
import { AcademicArea } from 'src/academic-areas/entities/academic-area.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subject, AcademicProgram, AcademicArea]),
    AcademicProgramsModule,
    AcademicAreasModule,
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService],
})
export class SubjectsModule {}
