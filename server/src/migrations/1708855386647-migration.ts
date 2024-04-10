import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708855386647 implements MigrationInterface {
    name = 'Migration1708855386647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ADD "roomId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "roomId"`);
    }

}
