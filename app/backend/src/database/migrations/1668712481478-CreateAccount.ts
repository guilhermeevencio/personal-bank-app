import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAccount1668712481478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'accounts',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'balance',
                        type: 'int',
                    },
                    // {
                    //     name: 'debitedAcountId',
                    //     type: 'uuid'
                    // }
                ]
            }),
            true,
        )
        // await queryRunner.createForeignKey(
        //     'accounts',
        //     new TableForeignKey({
        //         columnNames: ['debitedAcountId'],
        //         referencedTableName: 'transactions',
        //         referencedColumnNames: ['id']
        //     })
        // )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('accounts')
    }

}
