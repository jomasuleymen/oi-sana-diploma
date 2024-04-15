import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713183517972 implements MigrationInterface {
    name = 'Migration1713183517972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses_enrollers_users" ("coursesId" uuid NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_6edb54a78fd017f9e14921440cd" PRIMARY KEY ("coursesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f88a574e6766f40430fe702e4e" ON "courses_enrollers_users" ("coursesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_54fe5320de87243f07a29d6aea" ON "courses_enrollers_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "courses_enrollers_users" ADD CONSTRAINT "FK_f88a574e6766f40430fe702e4e7" FOREIGN KEY ("coursesId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "courses_enrollers_users" ADD CONSTRAINT "FK_54fe5320de87243f07a29d6aea5" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses_enrollers_users" DROP CONSTRAINT "FK_54fe5320de87243f07a29d6aea5"`);
        await queryRunner.query(`ALTER TABLE "courses_enrollers_users" DROP CONSTRAINT "FK_f88a574e6766f40430fe702e4e7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_54fe5320de87243f07a29d6aea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f88a574e6766f40430fe702e4e"`);
        await queryRunner.query(`DROP TABLE "courses_enrollers_users"`);
    }

}
