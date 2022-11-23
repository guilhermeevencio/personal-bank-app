import { Account } from '../../users/entities/Account'
import { v4 as uuidV4 } from 'uuid'
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm'


@Entity('transactions')
class Transaction {
  @PrimaryColumn()
  id: string

  
  @Column()
  debitedAccountId: string
  @JoinColumn({ name: 'debitedAccountId' })
  @ManyToOne(() => Account)
  debitedAccount: Account

  @Column()
  creditedAccountId: string
  @JoinColumn({ name: 'creditedAccountId' })
  @ManyToOne(() => Account)
  creditedAccount: Account

  @Column()
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

