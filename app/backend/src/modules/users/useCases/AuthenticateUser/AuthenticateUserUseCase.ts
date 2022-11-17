import { inject, injectable } from "tsyringe";
import { compare } from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { IUserDTO } from "../../dtos/IUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IResponse {
  username: string,
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) { }
  async execute({ username, password }: IUserDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByUsername(username)
    if (!user) {
      throw new Error("Invalid email or password!");
    }

    const isPasswordValid = await compare(password, user.password)
    
    if (!isPasswordValid) {
      throw new Error("Invalid email or password!");
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'jwt_secret', {
      subject: user.id,
      expiresIn: '1d'
    })

    return { username, token }
  }
}

export { AuthenticateUserUseCase }