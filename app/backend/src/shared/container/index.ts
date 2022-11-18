import { container } from 'tsyringe'
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository'
import { UserRepository } from '../../modules/users/repositories/implementations/UsersRepository'

import {ITransactionsRepository} from '../../modules/transactions/repositories/ITransactionsRepository'
import {TransactionsRepository} from '../../modules/transactions/repositories/implementations/TransactionsRepository'


container.registerSingleton<IUsersRepository>('UserRepository', UserRepository)

container.registerSingleton<ITransactionsRepository>('TransactionsRepository', TransactionsRepository)