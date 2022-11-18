import { Account } from '../../users/entities/Account'
import { v4 as uuidV4 } from 'uuid'
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn} from 'typeorm'


@Entity('transactions')
class Transaction {
  @PrimaryColumn()
  id: string


  @ManyToOne(() => Account, { eager: true })
  debitedAccountId: string

  @ManyToOne(() => Account, { eager: true })
  creditedAccountId: string

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

