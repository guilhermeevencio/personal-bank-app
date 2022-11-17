import CustomError from "../../../../errors/CustomError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body

    if (!username || !password) {
      throw new CustomError('username and password required!', 400)
    }

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const userCredentials = await authenticateUserUseCase.execute({ username, password })

    return res.status(200).json(userCredentials)
  }
}

export { AuthenticateUserController }