import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713206533659 implements MigrationInterface {
    name = 'Migration1713206533659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "paidAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "paidAt" SET NOT NULL`);
    }

}
