import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712655138336 implements MigrationInterface {
    name = 'Migration1712655138336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ADD "avgRate" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "rateCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "rateCount"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "avgRate"`);
    }

}
