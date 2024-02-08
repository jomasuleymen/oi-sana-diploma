import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706795633582 implements MigrationInterface {
    name = 'Migration1706795633582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "read" boolean NOT NULL DEFAULT false, "delivered" boolean NOT NULL DEFAULT false, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "fromId" integer, "toId" integer, CONSTRAINT "PK_45bb3707fbb99a73e831fee41e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370"`);
        await queryRunner.query(`CREATE INDEX "IDX_682a0764c8b0da92d8247f7a54" ON "articles" ("title", "slug") `);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "UQ_3ff5abee4fe81adfc2c83302920" UNIQUE ("authorId", "title")`);
        await queryRunner.query(`ALTER TABLE "message_entity" ADD CONSTRAINT "FK_c5b8227c6d614856d489b516c84" FOREIGN KEY ("fromId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_entity" ADD CONSTRAINT "FK_3c45d244921f60ea2cf8aab7e6a" FOREIGN KEY ("toId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message_entity" DROP CONSTRAINT "FK_3c45d244921f60ea2cf8aab7e6a"`);
        await queryRunner.query(`ALTER TABLE "message_entity" DROP CONSTRAINT "FK_c5b8227c6d614856d489b516c84"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "UQ_3ff5abee4fe81adfc2c83302920"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_682a0764c8b0da92d8247f7a54"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096" UNIQUE ("title")`);
        await queryRunner.query(`DROP TABLE "message_entity"`);
    }

}
