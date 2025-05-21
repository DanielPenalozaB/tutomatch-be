import { Test, TestingModule } from '@nestjs/testing';
import { TutoringOffersService } from './tutoring-offers.service';

describe('TutoringOffersService', () => {
  let service: TutoringOffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutoringOffersService],
    }).compile();

    service = module.get<TutoringOffersService>(TutoringOffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
