import { Module } from '@nestjs/common';
import { AcademicProgramsService } from './academic-programs.service';
import { AcademicProgramsController } from './academic-programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicProgram } from './entities/academic-program.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AcademicProgram]),
  ],
  controllers: [AcademicProgramsController],
  providers: [AcademicProgramsService],
  exports: [AcademicProgramsService],
})
export class AcademicProgramsModule {}
