import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712655506829 implements MigrationInterface {
    name = 'Migration1712655506829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "avgRate"`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "avgRate" real NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "avgRate"`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "avgRate" integer NOT NULL DEFAULT '0'`);
    }

}
