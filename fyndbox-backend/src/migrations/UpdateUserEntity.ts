import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserIdToUUID1728694714567 implements MigrationInterface {
  name = 'UpdateUserIdToUUID1728694714567';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "user" ADD "newUserId" uuid NOT NULL DEFAULT uuid_generate_v4();
      `);

    await queryRunner.query(`
        ALTER TABLE "user" ADD CONSTRAINT "UQ_newUserId" UNIQUE ("newUserId");
      `);

    await queryRunner.query(`
        ALTER TABLE "storage" ADD "newUserId" uuid;
      `);

    await queryRunner.query(`
        UPDATE "storage" SET "newUserId" = "user"."newUserId" FROM "user" WHERE "storage"."userId" = "user"."id";
      `);

    await queryRunner.query(`
        ALTER TABLE "storage" DROP COLUMN "userId";
      `);

    await queryRunner.query(`
        ALTER TABLE "storage" RENAME COLUMN "newUserId" TO "userId";
      `);

    await queryRunner.query(`
        ALTER TABLE "storage" ALTER COLUMN "userId" SET NOT NULL;
      `);

    await queryRunner.query(`
        ALTER TABLE "storage" ADD CONSTRAINT "FK_newUserId" FOREIGN KEY ("userId") REFERENCES "user"("newUserId") ON DELETE CASCADE;
      `);
    // Step 5: Rename "newUserId" in the "user" table to "id".
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "newUserId" TO "id"`,
    );
    // Step 6: Rebuild foreign key relationships if necessary.
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverse the migration, converting the UUIDs back to integers.
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_newUserId"`,
    );
    await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "storage" ADD "userId" integer`);
  }
}
