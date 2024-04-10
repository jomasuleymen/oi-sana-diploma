import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1710243026873 implements MigrationInterface {
    name = 'Migration1710243026873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lessons" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "video" character varying NOT NULL, "courseId" uuid, CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "video"`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD CONSTRAINT "FK_1a9ff2409a84c76560ae8a92590" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "FK_1a9ff2409a84c76560ae8a92590"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "video" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "lessons"`);
    }

}
