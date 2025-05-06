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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'postgres'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'tutomatch_user'),
        password: configService.get('DB_PASSWORD', 'tutomatch_password'),
        database: configService.get('DB_DATABASE', 'tutomatch_db'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') !== 'production',
      }),
    }),
    UsersModule,
    AuthModule,
    SubjectsModule,
    TutorsModule,
    AvailabilitiesModule,
    TutoringSessionsModule,
    NotificationsModule,
    MessagesModule,
    ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
