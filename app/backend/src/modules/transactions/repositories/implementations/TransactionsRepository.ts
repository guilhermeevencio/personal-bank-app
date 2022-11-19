import { Repository, QueryRunner } from 'typeorm';
import CustomError from '../../../../errors/CustomError';
import AppDataSource from '../../../../database';
import { ITransactionDTO } from '../../dtos/ITransactionDTO';
import { ITransactionsRepository } from '../ITransactionsRepository';
import { Transaction } from '../../entities/Transaction';
import { Account } from '../../../users/entities/Account';


class TransactionsRepository implements ITransactionsRepository {
  private transactionsRepository: Repository<Transaction>;
  private accountsRepository: Repository<Account>;
  private queryRunner: QueryRunner;

  constructor() {
    this.transactionsRepository = AppDataSource.getRepository(Transaction);
    this.accountsRepository = AppDataSource.getRepository(Account);
    this.queryRunner = AppDataSource.createQueryRunner();
  }

  async findAccount(accountId: string): Promise<Account> {
    const account = await this.accountsRepository.findOne({ where: { id: accountId } });
    return account;
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
      } = data;

      const accountToAddMoney = await this.findAccount(creditedAccountId);
      const accountToDebitMoney = await this.findAccount(debitedAccountId);

      if (accountToDebitMoney.balance < value) throw new CustomError('Insuficient funds!', 400);

      await this.accountsRepository.update(
        { id: creditedAccountId },
        { balance: (value + accountToAddMoney.balance) }
      );

      await this.accountsRepository.update(
        { id: debitedAccountId },
        { balance: (accountToDebitMoney.balance - value) }
      );

      const transaction = this.transactionsRepository.create(
        {
          value,
          description,
          creditedAccountId: accountToAddMoney,
          debitedAccountId: accountToDebitMoney,
        }
      );

      const createdTransaction = await this.transactionsRepository.save(transaction);

      await this.queryRunner.commitTransaction();
      return createdTransaction;
    } catch (err) {
      await this.queryRunner.rollbackTransaction();
      throw new CustomError(err.message, 400);
    }
  }

  async findAllByOperation(
    operation: 'cash-in' | 'cash-out' | 'all',
    accountId: string
  ): Promise<Transaction[]> {
    const account = await this.findAccount(accountId);

    let transactions: Transaction[]

    switch (operation) {
      case ('cash-in'):
        transactions = await this.transactionsRepository
          .find({ where: { creditedAccountId: account } });
        break
      case ('cash-out'):
        transactions = await this.transactionsRepository
          .find({ where: { debitedAccountId: account } });
        return transactions
      case 'all':
        transactions = await this.transactionsRepository
          .find({
            where: [{ creditedAccountId: account }, { debitedAccountId: account }]
          });
        break;
      default:
        break;
    }

    return transactions;
  }
}

export { TransactionsRepository };