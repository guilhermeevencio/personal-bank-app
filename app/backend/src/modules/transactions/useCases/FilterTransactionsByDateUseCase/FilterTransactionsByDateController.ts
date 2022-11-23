import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FilterTransacitionsByDateUseCase } from './FilterTransactionsByDateUseCase';


class FilterTransactionsByIdController {
  async handle(req: Request, res: Response) {
    const {
      minDateStr,
      maxDateStr,
      operation,
      accountId,
    } = req.body;

    const filterTransacitionsByDateUseCase = container
      .resolve(FilterTransacitionsByDateUseCase);

    const transactions = await filterTransacitionsByDateUseCase
      .execute(minDateStr, maxDateStr, operation, accountId);

    return res.status(200).json(transactions);
  };
};

export { FilterTransactionsByIdController };