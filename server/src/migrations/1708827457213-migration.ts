import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708827457213 implements MigrationInterface {
    name = 'Migration1708827457213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(30) NOT NULL, "firstname" character varying(120), "lastname" character varying(120), "email" character varying NOT NULL, "emailVerified" TIMESTAMP WITH TIME ZONE, "profileImage" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3f635053ca82e40b2869026774" ON "users" ("firstname") `);
        await queryRunner.query(`CREATE INDEX "IDX_9caa2250cccf6e7a1bd656680f" ON "users" ("lastname") `);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_ace513fa30d485cfd25c11a9e4" ON "users" ("role") `);
        await queryRunner.query(`CREATE TABLE "articles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "coverImage" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "authorUserId" integer, CONSTRAINT "UQ_058228dbd489dae3652081df629" UNIQUE ("authorUserId", "title"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3c28437db9b5137136e1f6d609" ON "articles" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_1123ff6815c5b8fec0ba9fec37" ON "articles" ("slug") `);
        await queryRunner.query(`CREATE INDEX "IDX_682a0764c8b0da92d8247f7a54" ON "articles" ("title", "slug") `);
        await queryRunner.query(`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "slug" character varying NOT NULL, "description" character varying NOT NULL, "coverImage" character varying NOT NULL, "video" character varying NOT NULL, "authorUserId" integer, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specialists" ("userId" integer NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "resume" character varying NOT NULL, CONSTRAINT "PK_17b10ae1f97222b65fcb3d2dc40" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "meditation_category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "image" character varying(255) NOT NULL, CONSTRAINT "PK_be42374eb0d7f57a1115d9a61dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c9050cc55ddb584a44f1d0855b" ON "meditation_category" ("name") `);
        await queryRunner.query(`CREATE TABLE "meditation" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "coverImage" character varying NOT NULL, "video" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_39d69861bf798fff8facbb04620" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f28e7d56fbb191069b5eb4ad56" ON "meditation" ("title") `);
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "read" boolean NOT NULL DEFAULT false, "delivered" boolean NOT NULL DEFAULT false, "content" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "senderId" integer, "roomId" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "usersId" integer NOT NULL, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "author" character varying(100) NOT NULL, "image" character varying(100) NOT NULL, "details" character varying NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3cd818eaf734a9d8814843f119" ON "books" ("title") `);
        await queryRunner.query(`CREATE TABLE "reset_password_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "token" character varying NOT NULL, "expires" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_138983ab711b02d0eef2df23a83" UNIQUE ("token"), CONSTRAINT "unique_email_reset_token" UNIQUE ("email", "token"), CONSTRAINT "PK_6feef0f35ec9c3da0f22e64da16" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "index_email_reset_token" ON "reset_password_tokens" ("email", "token") `);
        await queryRunner.query(`CREATE TABLE "verification_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "token" character varying NOT NULL, "expires" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_b00b1be0e5a820594d7c07a3dfb" UNIQUE ("token"), CONSTRAINT "unique_email_ver_token" UNIQUE ("email", "token"), CONSTRAINT "PK_f2d4d7a2aa57ef199e61567db22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "index_email_ver_token" ON "verification_tokens" ("email", "token") `);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_c1ec4875cd63959414da64054e5" FOREIGN KEY ("authorUserId") REFERENCES "specialists"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_4d2a8c432688824fec26e33d3f1" FOREIGN KEY ("authorUserId") REFERENCES "specialists"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "specialists" ADD CONSTRAINT "FK_17b10ae1f97222b65fcb3d2dc40" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meditation" ADD CONSTRAINT "FK_96c56d6bacbfff7e505a08d418e" FOREIGN KEY ("categoryId") REFERENCES "meditation_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_e8c8b21f237e93b3bfe12f9bf13" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_e8c8b21f237e93b3bfe12f9bf13"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`ALTER TABLE "meditation" DROP CONSTRAINT "FK_96c56d6bacbfff7e505a08d418e"`);
        await queryRunner.query(`ALTER TABLE "specialists" DROP CONSTRAINT "FK_17b10ae1f97222b65fcb3d2dc40"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_4d2a8c432688824fec26e33d3f1"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_c1ec4875cd63959414da64054e5"`);
        await queryRunner.query(`DROP INDEX "public"."index_email_ver_token"`);
        await queryRunner.query(`DROP TABLE "verification_tokens"`);
        await queryRunner.query(`DROP INDEX "public"."index_email_reset_token"`);
        await queryRunner.query(`DROP TABLE "reset_password_tokens"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3cd818eaf734a9d8814843f119"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f28e7d56fbb191069b5eb4ad56"`);
        await queryRunner.query(`DROP TABLE "meditation"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9050cc55ddb584a44f1d0855b"`);
        await queryRunner.query(`DROP TABLE "meditation_category"`);
        await queryRunner.query(`DROP TABLE "specialists"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_682a0764c8b0da92d8247f7a54"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1123ff6815c5b8fec0ba9fec37"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c28437db9b5137136e1f6d609"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ace513fa30d485cfd25c11a9e4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9caa2250cccf6e7a1bd656680f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f635053ca82e40b2869026774"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
