import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708828105132 implements MigrationInterface {
    name = 'Migration1708828105132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP CONSTRAINT "FK_568a2cdf821fc4b8278c430a1a3"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP CONSTRAINT "FK_d30859ac9f6a02079990974f978"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_568a2cdf821fc4b8278c430a1a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d30859ac9f6a02079990974f97"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP CONSTRAINT "PK_a461e084d6067da308800c9877e"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD CONSTRAINT "PK_d30859ac9f6a02079990974f978" PRIMARY KEY ("usersId")`);
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP COLUMN "roomsId"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP CONSTRAINT "PK_d30859ac9f6a02079990974f978"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD "roomId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD CONSTRAINT "PK_21fac903d9eb57d9e1268f9ca1e" PRIMARY KEY ("roomId")`);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP CONSTRAINT "PK_21fac903d9eb57d9e1268f9ca1e"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD CONSTRAINT "PK_fcf771168b2508779b78b974482" PRIMARY KEY ("roomId", "userId")`);
        await queryRunner.query(`CREATE INDEX "IDX_21fac903d9eb57d9e1268f9ca1" ON "rooms_users" ("roomId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1e4d4653ef57fc05772e88e4de" ON "rooms_users" ("userId") `);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD CONSTRAINT "FK_21fac903d9eb57d9e1268f9ca1e" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD CONSTRAINT "FK_1e4d4653ef57fc05772e88e4de5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP CONSTRAINT "FK_1e4d4653ef57fc05772e88e4de5"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP CONSTRAINT "FK_21fac903d9eb57d9e1268f9ca1e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1e4d4653ef57fc05772e88e4de"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21fac903d9eb57d9e1268f9ca1"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP CONSTRAINT "PK_fcf771168b2508779b78b974482"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD CONSTRAINT "PK_21fac903d9eb57d9e1268f9ca1e" PRIMARY KEY ("roomId")`);
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP CONSTRAINT "PK_21fac903d9eb57d9e1268f9ca1e"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP COLUMN "roomId"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD "usersId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD CONSTRAINT "PK_d30859ac9f6a02079990974f978" PRIMARY KEY ("usersId")`);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD "roomsId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooms_users" DROP CONSTRAINT "PK_d30859ac9f6a02079990974f978"`);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD CONSTRAINT "PK_a461e084d6067da308800c9877e" PRIMARY KEY ("roomsId", "usersId")`);
        await queryRunner.query(`CREATE INDEX "IDX_d30859ac9f6a02079990974f97" ON "rooms_users" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_568a2cdf821fc4b8278c430a1a" ON "rooms_users" ("roomsId") `);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD CONSTRAINT "FK_d30859ac9f6a02079990974f978" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rooms_users" ADD CONSTRAINT "FK_568a2cdf821fc4b8278c430a1a3" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
