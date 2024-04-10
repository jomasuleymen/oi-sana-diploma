import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712756990582 implements MigrationInterface {
    name = 'Migration1712756990582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specialists" ADD "about" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specialists" DROP COLUMN "about"`);
    }

}
