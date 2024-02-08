import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707336358371 implements MigrationInterface {
    name = 'Migration1707336358371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "author" character varying(100) NOT NULL, "image" character varying(100) NOT NULL, "details" character varying NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3cd818eaf734a9d8814843f119" ON "books" ("title") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_3cd818eaf734a9d8814843f119"`);
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
