// import CustomError from "../../../../errors/CustomError";
import { Request, Response } from "express";
import { ITransactionDTO } from "../../dtos/ITransactionDTO";
import { container } from "tsyringe";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

class CreateTransactionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data: ITransactionDTO = req.body

    const createTransactionUseCase = container.resolve(CreateTransactionUseCase)

    await createTransactionUseCase.execute(data)

    return res.status(201).json({ message: 'Sucessful transaction!' })
  }
}

export { CreateTransactionController }