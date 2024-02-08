import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707298145561 implements MigrationInterface {
    name = 'Migration1707298145561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_fe0bb3f6520ee0469504521e71"`);
        await queryRunner.query(`CREATE TABLE "meditation_category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "image" character varying(255) NOT NULL, CONSTRAINT "PK_be42374eb0d7f57a1115d9a61dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c9050cc55ddb584a44f1d0855b" ON "meditation_category" ("name") `);
        await queryRunner.query(`CREATE TABLE "meditation" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "video" character varying(255) NOT NULL, "categoryId" integer, CONSTRAINT "PK_39d69861bf798fff8facbb04620" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f28e7d56fbb191069b5eb4ad56" ON "meditation" ("title") `);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstname" character varying(120)`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastname" character varying(120)`);
        await queryRunner.query(`CREATE INDEX "IDX_3f635053ca82e40b2869026774" ON "users" ("firstname") `);
        await queryRunner.query(`CREATE INDEX "IDX_9caa2250cccf6e7a1bd656680f" ON "users" ("lastname") `);
        await queryRunner.query(`ALTER TABLE "meditation" ADD CONSTRAINT "FK_96c56d6bacbfff7e505a08d418e" FOREIGN KEY ("categoryId") REFERENCES "meditation_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meditation" DROP CONSTRAINT "FK_96c56d6bacbfff7e505a08d418e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9caa2250cccf6e7a1bd656680f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f635053ca82e40b2869026774"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastname" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstname" character varying`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f28e7d56fbb191069b5eb4ad56"`);
        await queryRunner.query(`DROP TABLE "meditation"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9050cc55ddb584a44f1d0855b"`);
        await queryRunner.query(`DROP TABLE "meditation_category"`);
        await queryRunner.query(`CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `);
    }

}
