import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706456979802 implements MigrationInterface {
    name = 'Migration1706456979802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "coverImage" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096" UNIQUE ("title"), CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3c28437db9b5137136e1f6d609" ON "articles" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_1123ff6815c5b8fec0ba9fec37" ON "articles" ("slug") `);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'USER', 'SPECIAL')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(30) NOT NULL, "email" character varying NOT NULL, "emailVerified" TIMESTAMP, "firstname" character varying, "lastname" character varying, "profileImage" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_ace513fa30d485cfd25c11a9e4" ON "users" ("role") `);
        await queryRunner.query(`CREATE TABLE "verification_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "token" character varying NOT NULL, "expires" TIMESTAMP NOT NULL, CONSTRAINT "UQ_b00b1be0e5a820594d7c07a3dfb" UNIQUE ("token"), CONSTRAINT "unique_email_ver_token" UNIQUE ("email", "token"), CONSTRAINT "PK_f2d4d7a2aa57ef199e61567db22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "index_email_ver_token" ON "verification_tokens" ("email", "token") `);
        await queryRunner.query(`CREATE TABLE "reset_password_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "token" character varying NOT NULL, "expires" TIMESTAMP NOT NULL, CONSTRAINT "UQ_138983ab711b02d0eef2df23a83" UNIQUE ("token"), CONSTRAINT "unique_email_reset_token" UNIQUE ("email", "token"), CONSTRAINT "PK_6feef0f35ec9c3da0f22e64da16" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "index_email_reset_token" ON "reset_password_tokens" ("email", "token") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."index_email_reset_token"`);
        await queryRunner.query(`DROP TABLE "reset_password_tokens"`);
        await queryRunner.query(`DROP INDEX "public"."index_email_ver_token"`);
        await queryRunner.query(`DROP TABLE "verification_tokens"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ace513fa30d485cfd25c11a9e4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe0bb3f6520ee0469504521e71"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1123ff6815c5b8fec0ba9fec37"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c28437db9b5137136e1f6d609"`);
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
