import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712656624162 implements MigrationInterface {
    name = 'Migration1712656624162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "description"`);
    }

}
