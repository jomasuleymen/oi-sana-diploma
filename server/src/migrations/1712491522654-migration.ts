import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712491522654 implements MigrationInterface {
    name = 'Migration1712491522654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "slug" character varying NOT NULL, "image" character varying, "content" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_d09152c44881b7620e12d6df099" UNIQUE ("slug"), CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "affirmations" ("id" SERIAL NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_e4b0183f2f9c1e6d28aaa23a9a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "affirmations"`);
        await queryRunner.query(`DROP TABLE "news"`);
    }

}
