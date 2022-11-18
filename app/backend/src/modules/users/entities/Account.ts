import { Transaction } from '../../transactions/entities/Transaction'
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('accounts')
class Account {
  @PrimaryColumn()
  id: string

  @Column({default: 100})
  balance: number

  constructor() {
    if(!this.id) {
      this.id = uuidV4()
    }
  }

  @OneToMany(() => Transaction, (transaction: Transaction) => transaction.creditedAccount)
  @OneToMany(() => Transaction, (transaction: Transaction) => transaction.debittedAcount)
  transactions: Transaction[]
}

export { Account }