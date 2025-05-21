import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTutoringOffers1747713814403 implements MigrationInterface {
    name = 'AddTutoringOffers1747713814403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "academicProgram" TO "academicProgramId"`);
        await queryRunner.query(`ALTER TYPE "public"."users_academicprogram_enum" RENAME TO "users_academicprogramid_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."tutoring_offers_modality_enum" AS ENUM('presential', 'virtual', 'mixed')`);
        await queryRunner.query(`CREATE TABLE "tutoring_offers" ("id" SERIAL NOT NULL, "modality" "public"."tutoring_offers_modality_enum" NOT NULL DEFAULT 'virtual', "topicsDescription" text, "isActive" boolean NOT NULL DEFAULT true, "sessionType" character varying NOT NULL DEFAULT 'individual', "location" character varying, "meetingLink" character varying, "hourlyRate" numeric(10,2), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tutorId" integer, "subjectId" integer, CONSTRAINT "PK_9a292ec3ba6e9d784bb0c4b67b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "academic_areas" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "description" text, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c168bdb675b12baab72abe2c1e8" UNIQUE ("name"), CONSTRAINT "UQ_e136af2b3d7c74b5e6c83271b04" UNIQUE ("code"), CONSTRAINT "PK_9d9d2ebd23be1d08de6afb6ff7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "academic_programs" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "totalSemesters" smallint NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4a92a6f0d9dc4267af3b7111053" UNIQUE ("name"), CONSTRAINT "UQ_58b2947ae0bcccee61b20b31b0d" UNIQUE ("code"), CONSTRAINT "PK_27e387feaac71037c08230a06bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "area"`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "credits" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "semester" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "academicProgramId" integer`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "academicAreaId" integer`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "academicProgramId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "academicProgramId" integer`);
        await queryRunner.query(`ALTER TABLE "tutoring_offers" ADD CONSTRAINT "FK_afe2f64734a5561d7ad9693e6ad" FOREIGN KEY ("tutorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutoring_offers" ADD CONSTRAINT "FK_41496952310c03ba3330e50bab9" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD CONSTRAINT "FK_53101b5cff600f45fc6d234a81c" FOREIGN KEY ("academicProgramId") REFERENCES "academic_programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD CONSTRAINT "FK_5f6d8dbfb53b229a134d2770c12" FOREIGN KEY ("academicAreaId") REFERENCES "academic_areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_2fc8f8e8eee5e55dd344e0875f8" FOREIGN KEY ("academicProgramId") REFERENCES "academic_programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_2fc8f8e8eee5e55dd344e0875f8"`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP CONSTRAINT "FK_5f6d8dbfb53b229a134d2770c12"`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP CONSTRAINT "FK_53101b5cff600f45fc6d234a81c"`);
        await queryRunner.query(`ALTER TABLE "tutoring_offers" DROP CONSTRAINT "FK_41496952310c03ba3330e50bab9"`);
        await queryRunner.query(`ALTER TABLE "tutoring_offers" DROP CONSTRAINT "FK_afe2f64734a5561d7ad9693e6ad"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "academicProgramId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "academicProgramId" "public"."users_academicprogramid_enum"`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "academicAreaId"`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "academicProgramId"`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "semester"`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "credits"`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "area" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "academic_programs"`);
        await queryRunner.query(`DROP TABLE "academic_areas"`);
        await queryRunner.query(`DROP TABLE "tutoring_offers"`);
        await queryRunner.query(`DROP TYPE "public"."tutoring_offers_modality_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_academicprogramid_enum" RENAME TO "users_academicprogram_enum"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "academicProgramId" TO "academicProgram"`);
    }

}
