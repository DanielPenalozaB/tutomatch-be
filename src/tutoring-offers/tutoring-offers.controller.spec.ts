import { Test, TestingModule } from '@nestjs/testing';
import { TutoringOffersController } from './tutoring-offers.controller';
import { TutoringOffersService } from './tutoring-offers.service';

describe('TutoringOffersController', () => {
  let controller: TutoringOffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutoringOffersController],
      providers: [TutoringOffersService],
    }).compile();

    controller = module.get<TutoringOffersController>(TutoringOffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
