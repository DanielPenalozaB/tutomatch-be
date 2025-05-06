import { Test, TestingModule } from '@nestjs/testing';
import { TutoringSessionsController } from './tutoring-sessions.controller';
import { TutoringSessionsService } from './tutoring-sessions.service';

describe('TutoringSessionsController', () => {
  let controller: TutoringSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutoringSessionsController],
      providers: [TutoringSessionsService],
    }).compile();

    controller = module.get<TutoringSessionsController>(TutoringSessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
