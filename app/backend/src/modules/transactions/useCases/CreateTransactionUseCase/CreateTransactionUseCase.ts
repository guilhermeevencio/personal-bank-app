import { ITransactionsRepository } from "../../repositories/ITransactionsRepository";
import { inject, injectable } from "tsyringe";
import { ITransactionDTO } from "../../dtos/ITransactionDTO";



@injectable()
class CreateTransactionUseCase {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository
  ) { }

  async execute(data: ITransactionDTO): Promise<void> {
    await this.transactionsRepository.createTransaction(data)
  }
}

export { CreateTransactionUseCase }