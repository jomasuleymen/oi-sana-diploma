import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708827918486 implements MigrationInterface {
    name = 'Migration1708827918486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_e8c8b21f237e93b3bfe12f9bf13"`);
        await queryRunner.query(`CREATE TABLE "rooms_users" ("roomsId" uuid NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_a461e084d6067da308800c9877e" PRIMARY KEY ("roomsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_568a2cdf821fc4b8278c430a1a" ON "rooms_users" ("roomsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d30859ac9f6a02079990974f97" ON "rooms_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD CONSTRAINT "FK_568a2cdf821fc4b8278c430a1a3" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD CONSTRAINT "FK_d30859ac9f6a02079990974f978" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP CONSTRAINT "FK_d30859ac9f6a02079990974f978"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP CONSTRAINT "FK_568a2cdf821fc4b8278c430a1a3"`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD "usersId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d30859ac9f6a02079990974f97"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_568a2cdf821fc4b8278c430a1a"`);
        await queryRunner.query(`DROP TABLE "rooms_users"`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_e8c8b21f237e93b3bfe12f9bf13" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
