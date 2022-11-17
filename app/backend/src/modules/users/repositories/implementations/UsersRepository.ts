import { IUsersRepository } from '../IUsersRepository';
import { IUserDTO } from '../../dtos/IUserDTO'
import { QueryRunner, Repository } from 'typeorm';
import { User } from '../../entities/User';
import AppDataSource from '../../../../database';
import { Account } from '../../entities/Account';
import { validate } from "class-validator"
import CustomError from '../../../../errors/CustomError';

class UserRepository implements IUsersRepository {
  private userRepository: Repository<User>
  private accountRepository: Repository<Account>
  private queryRunner: QueryRunner

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
    this.accountRepository = AppDataSource.getRepository(Account)
    this.queryRunner = AppDataSource.createQueryRunner()
  }

  async findById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    return user
  }

  async create({ username, password }: IUserDTO): Promise<void> {
    const initialBalance = 100
    await this.queryRunner.connect()
    await this.queryRunner.startTransaction()

    try {
      const account = this.accountRepository.create({ balance: initialBalance })
      const accountreturn = await this.accountRepository.save(account)

      const user = this.userRepository.create({ username, password })

      const errors = await validate(user)
      console.log(errors);
      
      if (errors.length > 0) {
        throw new CustomError('Make sure if your username has more than 3 charachters', 401)
      }

      await this.userRepository.save({ ...user, account: accountreturn })

      await this.queryRunner.commitTransaction()
    } catch (err) {
        await this.queryRunner.rollbackTransaction()
        throw new CustomError(err.message, 400)
    }

  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } })
    return user;
  }

}

export { UserRepository }