import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709634477620 implements MigrationInterface {
    name = 'Migration1709634477620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "methodologies" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "image" character varying(100) NOT NULL, "behaviour" character varying NOT NULL, "actions" text array DEFAULT '{}', CONSTRAINT "PK_be6131d4407e0b0396801cd04d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_bc959d08b821d35abfdda0641f" ON "methodologies" ("title") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_bc959d08b821d35abfdda0641f"`);
        await queryRunner.query(`DROP TABLE "methodologies"`);
    }

}
