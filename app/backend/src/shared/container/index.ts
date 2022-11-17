import { container } from 'tsyringe'
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository'
import { UserRepository } from '../../modules/users/repositories/implementations/UsersRepository'


container.registerSingleton<IUsersRepository>('UserRepository', UserRepository)