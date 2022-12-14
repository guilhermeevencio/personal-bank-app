import { Column, Entity, Exclusion, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('accounts')
class Account {
  @PrimaryColumn()
  id: string

  @Column({ default: 10000 })
  balance: number


  // @OneToMany(() => Transaction, (transaction: Transaction) => transaction.creditedAcount)
  // @OneToMany(() => Transaction, (transaction) => transaction.debitedAcountId)
  // debitedTransactions: Transaction


  constructor() {
    if(!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Account }