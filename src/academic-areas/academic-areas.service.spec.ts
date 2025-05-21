import { Test, TestingModule } from '@nestjs/testing';
import { AcademicAreasService } from './academic-areas.service';

describe('AcademicAreasService', () => {
  let service: AcademicAreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademicAreasService],
    }).compile();

    service = module.get<AcademicAreasService>(AcademicAreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
