import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706341047482 implements MigrationInterface {
    name = 'Migration1706341047482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "coverImage" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096" UNIQUE ("title"), CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3c28437db9b5137136e1f6d609" ON "articles" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_1123ff6815c5b8fec0ba9fec37" ON "articles" ("slug") `);
        await queryRunner.query(`ALTER TABLE "users" ADD "emailVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profileImage" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileImage"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emailVerified"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1123ff6815c5b8fec0ba9fec37"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c28437db9b5137136e1f6d609"`);
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
