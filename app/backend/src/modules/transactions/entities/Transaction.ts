import { Account } from '../../users/entities/Account'
import { v4 as uuidV4 } from 'uuid'
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm'


@Entity('transactions')
class Transaction {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => Account, (account) => account.transactions, { eager: true })
  debittedAcount: string

  @ManyToOne(() => Account, (account) => account.transactions, { eager: true })
  creditedAccount: string

  value: number

  @CreateDateColumn()
  createdAt: Date

  @Column()
  description: string

  constructor() {
    if(!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Transaction }

