import { Transaction } from '../../entities/Transaction';
import { Repository, QueryRunner } from 'typeorm';
import { ITransactionsRepository } from '../ITransactionsRepository';
import { Account } from '../../../users/entities/Account';
import AppDataSource from '../../../../database';
import { ITransactionDTO } from '../../dtos/ITransactionDTO';
import CustomError from '../../../../errors/CustomError';


class TransactionsRepository implements ITransactionsRepository {
  private transactionsRepository: Repository<Transaction>
  private accountsRepository: Repository<Account>
  private queryRunner: QueryRunner

  constructor() {
    this.transactionsRepository = AppDataSource.getRepository(Transaction)
    this.accountsRepository = AppDataSource.getRepository(Account)
    this.queryRunner = AppDataSource.createQueryRunner()
  }

  async createTransaction(data: ITransactionDTO): Promise<Transaction> {
    await this.queryRunner.connect()
    await this.queryRunner.startTransaction()

    try {
      const {
        creditedAccountId,
        debitedAccountId,
        value,
        description
      } = data

      const accountToAddMoney = await this.accountsRepository.findOne({ where: { id: creditedAccountId } })

      const accountToDebitMoney = await this.accountsRepository.findOne({ where: { id: debitedAccountId } })

      if (accountToDebitMoney.balance < value) throw new CustomError('Insuficient funds!', 400)

      await this.accountsRepository.update(
        { id: creditedAccountId },
        { balance: (value + accountToAddMoney.balance) }
      )

      await this.accountsRepository.update(
        { id: debitedAccountId },
        { balance: (accountToDebitMoney.balance - value) }
      )

      const transaction = this.transactionsRepository.create(
        {
          value,
          description,
          creditedAccountId: accountToAddMoney,
          debitedAccountId: accountToDebitMoney,
        }
      )

      const createdTransaction = await this.transactionsRepository.save(transaction)

      await this.queryRunner.commitTransaction()
      return createdTransaction
    } catch (err) {
      await this.queryRunner.rollbackTransaction()
      throw new CustomError(err.message, 400)
    }
  }

  async findAllTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
    const account = await this.accountsRepository.findOne({ where: { id: accountId } })
    // const teste = await AppDataSource.createQueryBuilder(Account, 'account')
    //   .select("account.id", 'id')
    //   .getMany()
    // // .from('accounts', 'accounts')
    // console.log(teste);
    
    const transactions = await this.transactionsRepository.find({
      where: [{ creditedAccountId: account }, { debitedAccountId: account }]
    })

    return transactions
  }

  async findAccount(accountId: string): Promise<Account> {
    const account = await this.accountsRepository.findOne({ where: { id: accountId } })
    return account
  }
}

export { TransactionsRepository }