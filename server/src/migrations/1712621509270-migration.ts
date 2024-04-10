import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712621509270 implements MigrationInterface {
    name = 'Migration1712621509270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "createdAt"`);
    }

}
