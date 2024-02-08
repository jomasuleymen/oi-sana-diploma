import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706796104437 implements MigrationInterface {
    name = 'Migration1706796104437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "read" boolean NOT NULL DEFAULT false, "delivered" boolean NOT NULL DEFAULT false, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "fromId" integer, "toId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_627bdb88ff88b446023474e4261" FOREIGN KEY ("fromId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4d8b2643c29b31e55b13b9213ab" FOREIGN KEY ("toId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4d8b2643c29b31e55b13b9213ab"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_627bdb88ff88b446023474e4261"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
