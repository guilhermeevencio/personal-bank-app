import { Router } from 'express'
import { FindAllTransactionsByAccountIdController } from '../modules/transactions/useCases/findAllTransactionsByAccountId/FindAllTransactionsByAccountIdController'
import { CreateTransactionController } from '../modules/transactions/useCases/CreateTransactionUseCase/CreateTransactionController'
import {FilterTransactionsByIdController} from '../modules/transactions/useCases/FilterTransactionsByDateUseCase/FilterTransactionsByDateController'

const transactionsRouter = Router()

const createTransactionController = new CreateTransactionController();
const findAllTransactionsByAccountIdController = new FindAllTransactionsByAccountIdController();
const filterTransactionsByIdController = new FilterTransactionsByIdController();

transactionsRouter.post('/find-transactions', findAllTransactionsByAccountIdController.handle)
transactionsRouter.post('/create', createTransactionController.handle)
transactionsRouter.post('/find-transactions-by-date', filterTransactionsByIdController.handle)

export { transactionsRouter }