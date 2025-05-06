import { Module } from '@nestjs/common';
import { TutoringSessionsService } from './tutoring-sessions.service';
import { TutoringSessionsController } from './tutoring-sessions.controller';

@Module({
  controllers: [TutoringSessionsController],
  providers: [TutoringSessionsService],
})
export class TutoringSessionsModule {}
