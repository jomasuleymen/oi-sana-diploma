import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712610382119 implements MigrationInterface {
    name = 'Migration1712610382119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coursesReview" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coursesReview" DROP COLUMN "createdAt"`);
    }

}
