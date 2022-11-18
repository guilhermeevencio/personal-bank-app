import { Router } from 'express'
import { CreateTransactionController } from '../modules/transactions/useCases/CreateTransactionUseCase/CreateTransactionController'

const transactionsRouter = Router()

const createTransactionController = new CreateTransactionController()

transactionsRouter.post('/create', createTransactionController.handle)

export { transactionsRouter }