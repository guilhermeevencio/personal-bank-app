import { Account } from '../entities/Account'
import { IUserDTO } from '../dtos/IUserDTO'
import { User } from '../entities/User'

interface IUsersRepository {
  create(data: IUserDTO): Promise<void>
  findByUsername(username: string): Promise<User>
  findById(userId: string): Promise<User>
}

export { IUsersRepository }