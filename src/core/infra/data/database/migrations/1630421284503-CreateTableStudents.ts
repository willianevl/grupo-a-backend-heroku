import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableStudents1630421284503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "students",
                columns: [
                    {
                        name: "ra",
                        type: "varchar",
                        length: "10",
                        isNullable: false,
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "50",
                        isNullable: false
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                        length: "11",
                        isNullable: false
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "50",
                        isNullable: false
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('students');
    }

}
