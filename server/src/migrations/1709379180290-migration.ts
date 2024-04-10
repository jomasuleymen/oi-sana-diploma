import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709379180290 implements MigrationInterface {
    name = 'Migration1709379180290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meditation" DROP COLUMN "coverImage"`);
        await queryRunner.query(`ALTER TABLE "meditation" DROP COLUMN "video"`);
        await queryRunner.query(`ALTER TABLE "meditation" ADD "audio" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meditation" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meditation" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "meditation" DROP COLUMN "audio"`);
        await queryRunner.query(`ALTER TABLE "meditation" ADD "video" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meditation" ADD "coverImage" character varying NOT NULL`);
    }

}
