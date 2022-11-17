import { v4 as uuidV4 } from 'uuid'
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import {Account} from './Account'
import { Matches, MinLength } from 'class-validator'

@Entity('users')
class User {
  @PrimaryColumn()
  id: string

  @Column()
  @MinLength(3, {
    message: 'username is too short!'
  })
  username: string

  @Column()
  password: string

  @OneToOne(() => Account, { cascade: true, eager: true })
  @JoinColumn()
  account: Account

  constructor() {
    if(!this.id) {
      this.id = uuidV4()
    }
  }
}

export { User }