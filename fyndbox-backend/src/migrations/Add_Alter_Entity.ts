import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1728694714566 implements MigrationInterface {
  name = 'Migrations1728694714566';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add the new "box" table
    await queryRunner.query(
      `CREATE TABLE "box" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, "image" character varying, "isFavorite" boolean NOT NULL DEFAULT false, "storageId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1a95bae3d12a9f21be6502e8a8b" PRIMARY KEY ("id"))`,
    );

    // Step 2: Add "image" column to "user" table
    await queryRunner.query(`ALTER TABLE "user" ADD "image" character varying`);

    // Step 3: Modify "storage" table
    await queryRunner.query(
      `ALTER TABLE "storage" DROP CONSTRAINT "FK_1b6226fd0003dbe26f809118849"`,
    );
    await queryRunner.query(
      `ALTER TABLE "storage" DROP CONSTRAINT "PK_f9b67a9921474d86492aad2e027"`,
    );
    await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "storage" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "storage" ADD CONSTRAINT "PK_f9b67a9921474d86492aad2e027" PRIMARY KEY ("id")`,
    );

    // Step 4: Only add the "userId" column if it doesn't exist
    const userIdColumn = await queryRunner.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'storage' AND column_name = 'userId'`,
    );

    if (userIdColumn.length === 0) {
      await queryRunner.query(`ALTER TABLE "storage" ADD "userId" uuid`);
    }

    // Step 5: Add foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "box" ADD CONSTRAINT "FK_882d517cb35c7932218e9d36264" FOREIGN KEY ("storageId") REFERENCES "storage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "storage" ADD CONSTRAINT "FK_1b6226fd0003dbe26f809118849" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "storage" DROP CONSTRAINT "FK_1b6226fd0003dbe26f809118849"`,
    );
    await queryRunner.query(
      `ALTER TABLE "box" DROP CONSTRAINT "FK_882d517cb35c7932218e9d36264"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );

    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "storage" ADD "userId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "storage" DROP CONSTRAINT "PK_f9b67a9921474d86492aad2e027"`,
    );
    await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "storage" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "storage" ADD CONSTRAINT "PK_f9b67a9921474d86492aad2e027" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "storage" ADD CONSTRAINT "FK_1b6226fd0003dbe26f809118849" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image"`);
    await queryRunner.query(`DROP TABLE "box"`);
  }
}
