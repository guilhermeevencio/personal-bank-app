import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes'
import { userRouter } from './user.routes'
import { transactionsRouter } from './transactions.routes'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()

router.use('/users', userRouter)
router.use(authenticateRoutes)
router.use('/transactions', transactionsRouter)

export { router }