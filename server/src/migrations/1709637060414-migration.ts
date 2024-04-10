import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709637060414 implements MigrationInterface {
    name = 'Migration1709637060414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "methodologies" DROP COLUMN "actions"`);
        await queryRunner.query(`ALTER TABLE "methodologies" ADD "actions" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "methodologies" DROP COLUMN "actions"`);
        await queryRunner.query(`ALTER TABLE "methodologies" ADD "actions" jsonb array DEFAULT '{}'`);
    }

}
