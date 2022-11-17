import { NextFunction, Request, Response } from "express";
import {verify} from 'jsonwebtoken'
import 'dotenv/config'
import { UserRepository } from "../modules/users/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction ) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new Error('Token missing!')
  }
  const [, token] = authHeader.split(' ')
  const { sub: userId } = verify(token, process.env.JWT_SECRET || 'jwt_secret') as IPayload

  const usersRepository = new UserRepository();

  const user = await usersRepository.findById(userId)

  if (!user) {
    throw new Error("User does not exists!");
  }
  next()
}