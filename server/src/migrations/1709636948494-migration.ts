import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709636948494 implements MigrationInterface {
    name = 'Migration1709636948494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "methodologies" DROP COLUMN "actions"`);
        await queryRunner.query(`ALTER TABLE "methodologies" ADD "actions" jsonb array DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "methodologies" DROP COLUMN "actions"`);
        await queryRunner.query(`ALTER TABLE "methodologies" ADD "actions" text array DEFAULT '{}'`);
    }

}
