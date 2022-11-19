import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllTransactionsByAccountIdUseCase } from "./FindAllTransactionsByAccountIdUseCase";


class FindAllTransactionsByAccountIdController {
  async handle(req: Request, res: Response) {
    const { accountId, operation } = req.body
    
    const findAllTransactionsByAccountIdUseCase = container
      .resolve(FindAllTransactionsByAccountIdUseCase)

    const transactions = await findAllTransactionsByAccountIdUseCase.execute(operation, accountId)

    return res.status(200).json(transactions)
  }
}

export { FindAllTransactionsByAccountIdController }