import { Test, TestingModule } from '@nestjs/testing';
import { AcademicProgramsService } from './academic-programs.service';

describe('AcademicProgramsService', () => {
  let service: AcademicProgramsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademicProgramsService],
    }).compile();

    service = module.get<AcademicProgramsService>(AcademicProgramsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
