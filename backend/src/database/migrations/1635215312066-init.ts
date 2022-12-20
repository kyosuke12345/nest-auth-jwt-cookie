import {MigrationInterface, QueryRunner} from "typeorm";

export class init1635215312066 implements MigrationInterface {
    name = 'init1635215312066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "test_user" ("id" SERIAL NOT NULL, "email" character varying(80) NOT NULL, "password" character varying(60) NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, CONSTRAINT "UQ_7ac6fdb81035d097bbdf57fee61" UNIQUE ("email"), CONSTRAINT "PK_d96d7dbdf10d76556f90a6b2d0f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "test_user"`);
    }

}
