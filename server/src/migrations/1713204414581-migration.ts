import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713204414581 implements MigrationInterface {
    name = 'Migration1713204414581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "orderId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "PK_af929a5f2a400fdb6913b4967e1" PRIMARY KEY ("orderId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "PK_af929a5f2a400fdb6913b4967e1"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "orderId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id")`);
    }

}
