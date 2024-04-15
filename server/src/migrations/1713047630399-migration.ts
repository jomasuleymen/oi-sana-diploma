import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713047630399 implements MigrationInterface {
    name = 'Migration1713047630399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specialists" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specialists" DROP COLUMN "phone"`);
    }

}
