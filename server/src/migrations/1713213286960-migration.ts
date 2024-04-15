import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713213286960 implements MigrationInterface {
    name = 'Migration1713213286960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "paidAt"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "paidAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "paidAt"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "paidAt" date`);
    }

}
