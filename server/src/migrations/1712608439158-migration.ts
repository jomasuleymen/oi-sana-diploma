import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712608439158 implements MigrationInterface {
    name = 'Migration1712608439158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coursesReview" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rate" integer NOT NULL, "review" character varying NOT NULL, "courseId" uuid, CONSTRAINT "PK_4af3bea508e45ac9f059be91d59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "coursesReview" ADD CONSTRAINT "FK_8c5c44c5f5cc5aceb1445541df7" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coursesReview" DROP CONSTRAINT "FK_8c5c44c5f5cc5aceb1445541df7"`);
        await queryRunner.query(`DROP TABLE "coursesReview"`);
    }

}
