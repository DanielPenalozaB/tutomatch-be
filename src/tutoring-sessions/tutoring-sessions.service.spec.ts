import { Test, TestingModule } from '@nestjs/testing';
import { TutoringSessionsService } from './tutoring-sessions.service';

describe('TutoringSessionsService', () => {
  let service: TutoringSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutoringSessionsService],
    }).compile();

    service = module.get<TutoringSessionsService>(TutoringSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
