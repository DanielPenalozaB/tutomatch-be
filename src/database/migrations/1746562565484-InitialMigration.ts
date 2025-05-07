import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1746562565484 implements MigrationInterface {
    name = 'InitialMigration1746562565484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."availabilities_day_enum" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')`);
        await queryRunner.query(`CREATE TABLE "availabilities" ("id" SERIAL NOT NULL, "day" "public"."availabilities_day_enum" NOT NULL, "startTime" character varying NOT NULL, "endTime" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tutorId" integer, CONSTRAINT "PK_9562bd8681d40361b1a124ea52c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tutor_subjects" ("id" SERIAL NOT NULL, "proficiencyLevel" smallint NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tutorId" integer, "subjectId" integer, CONSTRAINT "PK_5a426d581affea146fad8370bf7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subjects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "area" character varying NOT NULL, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_47a287fe64bd0e1027e603c335c" UNIQUE ("name"), CONSTRAINT "UQ_542cbba74dde3c82ab49c573109" UNIQUE ("code"), CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tutoring_sessions_status_enum" AS ENUM('scheduled', 'completed', 'cancelled', 'in_progress', 'pending_approval')`);
        await queryRunner.query(`CREATE TYPE "public"."tutoring_sessions_type_enum" AS ENUM('individual', 'group')`);
        await queryRunner.query(`CREATE TABLE "tutoring_sessions" ("id" SERIAL NOT NULL, "scheduledDate" TIMESTAMP NOT NULL, "duration" integer NOT NULL, "status" "public"."tutoring_sessions_status_enum" NOT NULL DEFAULT 'scheduled', "type" "public"."tutoring_sessions_type_enum" NOT NULL, "meetingLink" character varying, "location" character varying, "plannedTopics" text, "actualTopics" text, "studentNotes" text, "tutorNotes" text, "studentRating" smallint, "studentFeedback" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tutorId" integer, "studentId" integer, "subjectId" integer, CONSTRAINT "PK_ac31b0397b399a463de999fe85a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "content" text NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "sessionId" integer, "senderId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."notifications_type_enum" AS ENUM('session_request', 'session_approval', 'session_cancellation', 'session_reminder', 'new_message', 'system_alert')`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "message" text NOT NULL, "type" "public"."notifications_type_enum" NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "relatedEntityId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "recipientId" integer, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."reports_type_enum" AS ENUM('tutoring_stats', 'tutor_performance', 'student_progress', 'system_usage', 'financial')`);
        await queryRunner.query(`CREATE TABLE "reports" ("id" SERIAL NOT NULL, "type" "public"."reports_type_enum" NOT NULL, "title" character varying NOT NULL, "description" text, "data" jsonb NOT NULL, "startDate" TIMESTAMP, "endDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "generatedById" integer, CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('student', 'tutor', 'admin')`);
        await queryRunner.query(`CREATE TYPE "public"."users_academicprogram_enum" AS ENUM('Ingeniería de Sistemas', 'Ciencia de la Computación', 'Ingeniería Industrial')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'student', "password" character varying NOT NULL, "profilePicture" character varying, "bio" text, "studentCode" character varying, "academicProgram" "public"."users_academicprogram_enum", "semester" integer, "isVerified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_f139a5c7e5dba9670ae624bbfc2" UNIQUE ("studentCode"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "availabilities" ADD CONSTRAINT "FK_1281e43efce322b326d352e8d7d" FOREIGN KEY ("tutorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutor_subjects" ADD CONSTRAINT "FK_c5376690d9b7309d3c85cfcfd23" FOREIGN KEY ("tutorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutor_subjects" ADD CONSTRAINT "FK_f0ba25989d1e4fe6f18493fa0d3" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutoring_sessions" ADD CONSTRAINT "FK_ff838936aa4b0dc247f94ce06de" FOREIGN KEY ("tutorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutoring_sessions" ADD CONSTRAINT "FK_3ec2093aa4ec063f6115a86ca88" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutoring_sessions" ADD CONSTRAINT "FK_851b64f9135f678915a10ec0f17" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_066163c46cda7e8187f96bc87a0" FOREIGN KEY ("sessionId") REFERENCES "tutoring_sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_db873ba9a123711a4bff527ccd5" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_d3d65c7e12b3c642405fd1fbdc6" FOREIGN KEY ("generatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_d3d65c7e12b3c642405fd1fbdc6"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_db873ba9a123711a4bff527ccd5"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_066163c46cda7e8187f96bc87a0"`);
        await queryRunner.query(`ALTER TABLE "tutoring_sessions" DROP CONSTRAINT "FK_851b64f9135f678915a10ec0f17"`);
        await queryRunner.query(`ALTER TABLE "tutoring_sessions" DROP CONSTRAINT "FK_3ec2093aa4ec063f6115a86ca88"`);
        await queryRunner.query(`ALTER TABLE "tutoring_sessions" DROP CONSTRAINT "FK_ff838936aa4b0dc247f94ce06de"`);
        await queryRunner.query(`ALTER TABLE "tutor_subjects" DROP CONSTRAINT "FK_f0ba25989d1e4fe6f18493fa0d3"`);
        await queryRunner.query(`ALTER TABLE "tutor_subjects" DROP CONSTRAINT "FK_c5376690d9b7309d3c85cfcfd23"`);
        await queryRunner.query(`ALTER TABLE "availabilities" DROP CONSTRAINT "FK_1281e43efce322b326d352e8d7d"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_academicprogram_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "reports"`);
        await queryRunner.query(`DROP TYPE "public"."reports_type_enum"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "tutoring_sessions"`);
        await queryRunner.query(`DROP TYPE "public"."tutoring_sessions_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tutoring_sessions_status_enum"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
        await queryRunner.query(`DROP TABLE "tutor_subjects"`);
        await queryRunner.query(`DROP TABLE "availabilities"`);
        await queryRunner.query(`DROP TYPE "public"."availabilities_day_enum"`);
    }

}
