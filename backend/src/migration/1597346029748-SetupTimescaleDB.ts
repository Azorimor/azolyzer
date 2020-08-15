import {
  MigrationInterface, QueryRunner,
} from 'typeorm';

/**
 * This migration adds the TimescaleDB extension to postgres.
 */
export class SetupTimescaleDB1597346029748 implements MigrationInterface {
  /**
   * Perform the migration.
   * @param {QueryRunner} queryRunner The Query, which is run.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE`);
  }

  /**
   * Undo the migration.
   * @param {QueryRunner} queryRunner The Query, which is run.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION timescaledb`);
  }
}
