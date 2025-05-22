import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutoringSession } from './entities/tutoring-session.entity';
import { TutoringSessionsService } from './tutoring-sessions.service';
import { TutoringSessionsController } from './tutoring-sessions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TutoringSession])],
  controllers: [TutoringSessionsController],
  providers: [TutoringSessionsService],
})
export class TutoringSessionsModule {}