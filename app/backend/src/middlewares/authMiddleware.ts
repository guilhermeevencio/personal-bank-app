import { NextFunction, Request, Response } from "express";
import {verify} from 'jsonwebtoken'
import 'dotenv/config'
import { UserRepository } from "../modules/users/repositories/implementations/UsersRepository";
import CustomError from "../errors/CustomError";

interface IPayload {
  sub: string
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new CustomError('Token missing!', 401)
  }
  const [, token] = authHeader.split(' ')
  const { sub: userId } = verify(token, process.env.JWT_SECRET || 'jwt_secret') as IPayload

  const usersRepository = new UserRepository();

  const user = await usersRepository.findById(userId)

  if (!user) {
    throw new CustomError("User does not exists!", 401);
  }
  next()
}