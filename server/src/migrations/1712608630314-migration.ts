import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712608630314 implements MigrationInterface {
    name = 'Migration1712608630314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coursesReview" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "coursesReview" ADD CONSTRAINT "FK_c1559d562f5d853511318ee490a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coursesReview" DROP CONSTRAINT "FK_c1559d562f5d853511318ee490a"`);
        await queryRunner.query(`ALTER TABLE "coursesReview" DROP COLUMN "userId"`);
    }

}
