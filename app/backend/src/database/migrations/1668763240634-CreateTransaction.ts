import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTransaction1668763240634 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transactions',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'value',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'creditedAccountId',
                        type: 'uuid'
                    },
                    {
                        name: 'debitedAccountId',
                        type: 'uuid'
                    },
                    {
                        name: 'description',
                        type: 'varchar'
                    }
                ]
            }),
            true
        ),
        await queryRunner.createForeignKey(
            'transactions',
            new TableForeignKey({
                columnNames: ['debitedAccountId'],
                referencedTableName: 'accounts',
                referencedColumnNames: ['id']
            })
        ),
        await queryRunner.createForeignKey(
            'transactions',
            new TableForeignKey({
                columnNames: ['creditedAccountId'],
                referencedTableName: 'accounts',
                referencedColumnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('transactions')
    }

}
