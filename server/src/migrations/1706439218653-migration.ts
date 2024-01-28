import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706439218653 implements MigrationInterface {
    name = 'Migration1706439218653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."index_email_token"`);
        await queryRunner.query(`ALTER TABLE "verification_tokens" DROP CONSTRAINT "unique_email_token"`);
        await queryRunner.query(`CREATE TABLE "reset_password_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "token" character varying NOT NULL, "expires" TIMESTAMP NOT NULL, CONSTRAINT "UQ_138983ab711b02d0eef2df23a83" UNIQUE ("token"), CONSTRAINT "unique_email_reset_token" UNIQUE ("email", "token"), CONSTRAINT "PK_6feef0f35ec9c3da0f22e64da16" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "index_email_reset_token" ON "reset_password_tokens" ("email", "token") `);
        await queryRunner.query(`CREATE INDEX "index_email_ver_token" ON "verification_tokens" ("email", "token") `);
        await queryRunner.query(`ALTER TABLE "verification_tokens" ADD CONSTRAINT "unique_email_ver_token" UNIQUE ("email", "token")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verification_tokens" DROP CONSTRAINT "unique_email_ver_token"`);
        await queryRunner.query(`DROP INDEX "public"."index_email_ver_token"`);
        await queryRunner.query(`DROP INDEX "public"."index_email_reset_token"`);
        await queryRunner.query(`DROP TABLE "reset_password_tokens"`);
        await queryRunner.query(`ALTER TABLE "verification_tokens" ADD CONSTRAINT "unique_email_token" UNIQUE ("email", "token")`);
        await queryRunner.query(`CREATE INDEX "index_email_token" ON "verification_tokens" ("email", "token") `);
    }

}
