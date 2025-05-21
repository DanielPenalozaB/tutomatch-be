import { Module } from '@nestjs/common';
import { TutoringOffersService } from './tutoring-offers.service';
import { TutoringOffersController } from './tutoring-offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/subjects/entities/subject.entity';
import { UsersModule } from 'src/users/users.module';
import { TutoringOffer } from './entities/tutoring-offers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TutoringOffer, Subject]),
    UsersModule,
  ],
  controllers: [TutoringOffersController],
  providers: [TutoringOffersService],
  exports: [TutoringOffersService],
})
export class TutoringOffersModule {}