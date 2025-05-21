import { Test, TestingModule } from '@nestjs/testing';
import { AcademicProgramsController } from './academic-programs.controller';
import { AcademicProgramsService } from './academic-programs.service';

describe('AcademicProgramsController', () => {
  let controller: AcademicProgramsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicProgramsController],
      providers: [AcademicProgramsService],
    }).compile();

    controller = module.get<AcademicProgramsController>(AcademicProgramsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
