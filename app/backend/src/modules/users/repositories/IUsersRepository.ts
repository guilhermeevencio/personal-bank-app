import { IUserDTO } from '../dtos/IUserDTO'

interface IUsersRepository {
  create(data: IUserDTO): Promise<void>
}

export { IUsersRepository }