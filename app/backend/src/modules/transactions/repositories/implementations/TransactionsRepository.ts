import { Repository, QueryRunner, Between } from 'typeorm';
import CustomError from '../../../../errors/CustomError';
import AppDataSource from '../../../../database';
import { ITransactionDTO } from '../../dtos/ITransactionDTO';
import { ITransactionsRepository } from '../ITransactionsRepository';
import { Transaction } from '../../entities/Transaction';
import { Account } from '../../../users/entities/Account';
import { User } from '../../../users/entities/User';


class TransactionsRepository implements ITransactionsRepository {
  private transactionsRepository: Repository<Transaction>;
  private accountsRepository: Repository<Account>;
  private usersRepository: Repository<User>;
  private queryRunner: QueryRunner;

  constructor() {
    this.transactionsRepository = AppDataSource.getRepository(Transaction);
    this.accountsRepository = AppDataSource.getRepository(Account);
    this.usersRepository = AppDataSource.getRepository(User)
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
        creditedAccount,
        debitedAccountId,
        value,
        description
      } = data;

      const accountToDebitMoney = await this.findAccount(debitedAccountId);
      const userToCreditMoney = await this.usersRepository.findOne({where: {
        username: creditedAccount
      }});
      

      if (accountToDebitMoney.balance < value) throw new CustomError('Insuficient funds!', 400);

      await this.accountsRepository.update(
        { id: userToCreditMoney.account.id },
        { balance: (value + userToCreditMoney.account.balance) }
      );

      await this.accountsRepository.update(
        { id: debitedAccountId },
        { balance: (accountToDebitMoney.balance - value) }
      );

      const transaction = this.transactionsRepository.create(
        {
          value,
          description,
          creditedAccountId: userToCreditMoney.account.id,
          debitedAccountId: accountToDebitMoney.id,
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
          .find({ where: { creditedAccountId: account.id } });
        break
      case ('cash-out'):
        transactions = await this.transactionsRepository
          .find({ where: { debitedAccountId: account.id } });
        return transactions
      case 'all':
        transactions = await this.transactionsRepository
          .find({
            where: [{ creditedAccountId: account.id }, { debitedAccountId: account.id }]
          });
        break;
      default:
        break;
    };

    return transactions;
  };

  async filterByDate(
    minDate: Date,
    maxDate: Date,
    operation: 'cash-in' | 'cash-out' | 'all',
    accountId: string
  ): Promise<Transaction[]> {
    
    const transactions = await this.findAllByOperation(operation, accountId);
    const filteredTransactions = transactions.filter(({ createdAt }) => (
      createdAt >= minDate && createdAt <= maxDate
    ));
    return filteredTransactions;
  };
};

export { TransactionsRepository };