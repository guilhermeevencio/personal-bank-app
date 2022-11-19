import { Transaction } from '../entities/Transaction';
import { ITransactionDTO } from '../dtos/ITransactionDTO';
import { Account } from 'modules/users/entities/Account';

interface ITransactionsRepository {
  createTransaction(data: ITransactionDTO): Promise<Transaction>
  findAccount?(accountId: string): Promise<Account>
  findAllTransactionsByAccountId(accountId: string): Promise<Transaction[]>
  findAllByDate?(createdDate: Date): Promise<Transaction[]>
  findAllByOperation(operation: 'cash-out' | 'cash-in' | 'all', accountId: string): Promise<Transaction[]>
}

export { ITransactionsRepository }