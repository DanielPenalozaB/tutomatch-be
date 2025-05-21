import { Test, TestingModule } from '@nestjs/testing';
import { AcademicAreasController } from './academic-areas.controller';
import { AcademicAreasService } from './academic-areas.service';

describe('AcademicAreasController', () => {
  let controller: AcademicAreasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicAreasController],
      providers: [AcademicAreasService],
    }).compile();

    controller = module.get<AcademicAreasController>(AcademicAreasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
