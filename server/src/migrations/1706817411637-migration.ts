import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706817411637 implements MigrationInterface {
    name = 'Migration1706817411637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_acf951a58e3b9611dd96ce89042"`);
        await queryRunner.query(`ALTER TABLE "messages" RENAME COLUMN "receiverId" TO "roomId"`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "u1Id" integer NOT NULL, "u2Id" integer NOT NULL, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "roomId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "roomId" uuid`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_6b9b56522ec4bc35f2620aa5447" FOREIGN KEY ("u1Id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_511835f7c65b9f91e42e3bc98fa" FOREIGN KEY ("u2Id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_511835f7c65b9f91e42e3bc98fa"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_6b9b56522ec4bc35f2620aa5447"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "roomId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "roomId" integer`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`ALTER TABLE "messages" RENAME COLUMN "roomId" TO "receiverId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_acf951a58e3b9611dd96ce89042" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
