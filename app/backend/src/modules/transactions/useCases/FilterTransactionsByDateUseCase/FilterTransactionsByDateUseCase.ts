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
    [minY, minM, minD]: number[],
    [maxY, maxM, maxD]: number[],
    operation: 'cash-in' | 'cash-out' | 'all',
    accountId: string
  ): Promise<Transaction[]> {
    const minDate = new Date(`${minY}-${minM}-${minD}`);
    const maxDate = new Date(`${maxY}-${maxM}-${maxD}`);
    const transactions = await this.transactiosnRepository.filterByDate(minDate, maxDate, operation, accountId);
    return transactions;
  };
};

export {FilterTransacitionsByDateUseCase};