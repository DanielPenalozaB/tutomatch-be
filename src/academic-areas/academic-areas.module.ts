import { Module } from '@nestjs/common';
import { AcademicAreasService } from './academic-areas.service';
import { AcademicAreasController } from './academic-areas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicArea } from './entities/academic-area.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AcademicArea])
  ],
  controllers: [AcademicAreasController],
  providers: [AcademicAreasService],
  exports: [AcademicAreasService],
})
export class AcademicAreasModule {}
