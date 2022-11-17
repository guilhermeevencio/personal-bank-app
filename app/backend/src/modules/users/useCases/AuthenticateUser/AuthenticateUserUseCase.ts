import { inject, injectable } from "tsyringe";
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { IUserDTO } from "../../dtos/IUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import CustomError from "../../../../errors/CustomError";

interface IResponse {
  username: string,
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({ username, password }: IUserDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByUsername(username)
    if (!user) {
      throw new CustomError('Invalid username or password!', 401)
    }

    const isPasswordValid = await compare(password, user.password)
    
    if (!isPasswordValid) {
      throw new CustomError('Invalid username or password!', 401)
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'jwt_secret', {
      subject: user.id,
      expiresIn: '1d'
    })

    return { username, token }
  }
}

export { AuthenticateUserUseCase }