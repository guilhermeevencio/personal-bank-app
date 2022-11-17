import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes'
import { userRouter } from './user.routes'

const router = Router()

router.use('/users', userRouter)
router.use(authenticateRoutes)

export { router }