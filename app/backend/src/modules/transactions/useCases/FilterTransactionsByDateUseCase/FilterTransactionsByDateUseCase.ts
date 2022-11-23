import {ITransactionsRepository} from '../../repositories/ITransactionsRepository'
import {inject, injectable} from 'tsyringe'
import { Transaction } from '../../entities/Transaction'

@injectable()
class FilterTransacitionsByDateUseCase {
  constructor(
    @inject('TransactionsRepository')
    private transactiosnRepository: ITransactionsRepository
  ) {};

  async execute(
    minDateStr: string,
    maxDateStr: string,
    operation: 'cash-in' | 'cash-out' | 'all',
    accountId: string
  ): Promise<Transaction[]> {
    
    const minDate = new Date(minDateStr);
    const maxDate = new Date(maxDateStr);
    const transactions = await this.transactiosnRepository.filterByDate(minDate, maxDate, operation, accountId);
    return transactions;
  };
};

export {FilterTransacitionsByDateUseCase};