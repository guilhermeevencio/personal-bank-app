import { IUsersRepository } from '../IUsersRepository';
import { IUserDTO } from '../../dtos/IUserDTO'
import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import AppDataSource from '../../../../database';

class UserRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }
  async create({ username, password }: IUserDTO): Promise<void> {
    const user = this.repository.create({ username, password })

    await this.repository.save(user)
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.repository.findOne({ where: { username } })
    return user;
  }

}

export { UserRepository }