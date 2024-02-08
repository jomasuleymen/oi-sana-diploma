import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706797192848 implements MigrationInterface {
    name = 'Migration1706797192848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_627bdb88ff88b446023474e4261"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4d8b2643c29b31e55b13b9213ab"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "fromId"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "toId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "senderId" integer`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "receiverId" integer`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_acf951a58e3b9611dd96ce89042" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_acf951a58e3b9611dd96ce89042"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "receiverId"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "senderId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "toId" integer`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "fromId" integer`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4d8b2643c29b31e55b13b9213ab" FOREIGN KEY ("toId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_627bdb88ff88b446023474e4261" FOREIGN KEY ("fromId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
