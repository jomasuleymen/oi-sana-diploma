import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708827681877 implements MigrationInterface {
    name = 'Migration1708827681877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_e8c8b21f237e93b3bfe12f9bf13"`);
        await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "usersId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_e8c8b21f237e93b3bfe12f9bf13" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_e8c8b21f237e93b3bfe12f9bf13"`);
        await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "usersId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_e8c8b21f237e93b3bfe12f9bf13" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
