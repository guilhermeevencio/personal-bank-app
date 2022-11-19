import { ITransactionsRepository } from "../../repositories/ITransactionsRepository";
import { inject, injectable } from "tsyringe";
import { Transaction } from "modules/transactions/entities/Transaction";

@injectable()
class FindAllTransactionsByAccountIdUseCase {
  constructor(
    @inject('TransactionsRepository')
    private transactiosnRepository: ITransactionsRepository
  ) { }

  async execute(operation: 'cash-in' | 'cash-out' | 'all', accountId: string): Promise<Transaction[]> {
    const transactions = await this.transactiosnRepository.findAllByOperation(operation, accountId)

    return transactions
  }
}

export { FindAllTransactionsByAccountIdUseCase }