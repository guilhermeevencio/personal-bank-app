import CustomError from "../../../../errors/CustomError";
import { Request, Response } from "express";
import { container } from 'tsyringe'
import { CreateUserUseCase } from "./CreateUserUseCase";


class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body
    const regularExpression = new RegExp(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);

    if (!username || !password) {
      throw new CustomError('username and password required!', 400)
    }

    if (!regularExpression.test(password)) {
      throw new CustomError('Your password must have at least 8 characters, one uppercase letter and one number.', 400)
    }
    
    const createUserUseCase = container.resolve(CreateUserUseCase)

    await createUserUseCase.execute({ username, password })

    return res.status(201).json({ message: 'User created!' })
  }
}

export { CreateUserController }