import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUser1668714864369 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'password',
                        type: 'varchar'
                    },
                    {
                        name: 'accountId',
                        type: 'uuid'
                    }
                ]
            }),
            true,
        ),
        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                columnNames: ['accountId'],
                referencedTableName: 'accounts',
                referencedColumnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
