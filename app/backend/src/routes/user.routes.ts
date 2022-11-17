import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/CreateUser/CreateUserController'

const userRouter = Router()

const createUserController = new CreateUserController()

userRouter.post('/', createUserController.handle)

export { userRouter }