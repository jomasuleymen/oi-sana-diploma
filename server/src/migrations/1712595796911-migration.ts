import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712595796911 implements MigrationInterface {
    name = 'Migration1712595796911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f28e7d56fbb191069b5eb4ad56"`);
        await queryRunner.query(`ALTER TABLE "meditation" DROP COLUMN "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meditation" ADD "title" character varying(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f28e7d56fbb191069b5eb4ad56" ON "meditation" ("title") `);
    }

}
