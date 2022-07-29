import { MigrationInterface, QueryRunner } from 'typeorm';

export class exampleMigration1659095645895 implements MigrationInterface {
  name = 'exampleMigration1659095645895';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "version"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "version" bigint NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "version"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "version" integer NOT NULL`,
    );
  }
}
