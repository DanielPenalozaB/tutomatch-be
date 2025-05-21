import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TutorsModule } from './tutors/tutors.module';
import { AvailabilitiesModule } from './availabilities/availabilities.module';
import { TutoringSessionsModule } from './tutoring-sessions/tutoring-sessions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MessagesModule } from './messages/messages.module';
import { ReportsModule } from './reports/reports.module';
import { dataSourceOptions } from './configs/typeorm.config';
import { ResendModule } from './resend/resend.module';
import { TutoringOffersModule } from './tutoring-offers/tutoring-offers.module';
import { AcademicAreasModule } from './academic-areas/academic-areas.module';
import { AcademicProgramsModule } from './academic-programs/academic-programs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    SubjectsModule,
    TutorsModule,
    AvailabilitiesModule,
    TutoringSessionsModule,
    NotificationsModule,
    MessagesModule,
    ReportsModule,
    ResendModule,
    TutoringOffersModule,
    AcademicAreasModule,
    AcademicProgramsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
