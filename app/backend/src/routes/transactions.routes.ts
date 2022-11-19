import { Router } from 'express'
import { FindAllTransactionsByAccountIdController } from '../modules/transactions/useCases/findAllTransactionsByAccountId/FindAllTransactionsByAccountIdController'
import { CreateTransactionController } from '../modules/transactions/useCases/CreateTransactionUseCase/CreateTransactionController'

const transactionsRouter = Router()

const createTransactionController = new CreateTransactionController()
const findAllTransactionsByAccountIdController = new FindAllTransactionsByAccountIdController()

transactionsRouter.post('/find-transactions', findAllTransactionsByAccountIdController.handle)
transactionsRouter.post('/create', createTransactionController.handle)

export { transactionsRouter }