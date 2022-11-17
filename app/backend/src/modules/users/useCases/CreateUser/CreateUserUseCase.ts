import { inject, injectable } from 'tsyringe';
import { IUserDTO } from '../../dtos/IUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { hash } from 'bcrypt'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute({ username, password }: IUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByUsername(username)

    if (userAlreadyExists) throw new Error("User Already Exists!")

    const passwordHash = await hash(password, 8)
    await this.usersRepository.create({ username, password: passwordHash })
  }

}

export { CreateUserUseCase }