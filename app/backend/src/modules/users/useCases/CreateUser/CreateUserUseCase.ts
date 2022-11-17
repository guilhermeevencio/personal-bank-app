import { inject, injectable } from 'tsyringe';
import { IUserDTO } from '../../dtos/IUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ username, password }: IUserDTO): Promise<void> {
    await this.usersRepository.create({ username, password })
  }
}

export { CreateUserUseCase }