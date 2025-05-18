import { Module } from '@nestjs/common';
import { AvailabilitiesService } from './availabilities.service';
import { AvailabilitiesController } from './availabilities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Availability } from './entities/availability.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Availability, User])], 
  controllers: [AvailabilitiesController],
  providers: [AvailabilitiesService],
})
export class AvailabilitiesModule {}
