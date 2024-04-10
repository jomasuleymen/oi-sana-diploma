import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712703650682 implements MigrationInterface {
    name = 'Migration1712703650682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "link" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "link"`);
    }

}
