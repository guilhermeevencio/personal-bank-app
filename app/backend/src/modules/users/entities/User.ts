import { v4 as uuidV4 } from 'uuid'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('users')
class User {
  @PrimaryColumn()
  id: string

  @Column()
  username: string

  @Column()
  password: string

  constructor() {
    if(!this.id) {
      this.id = uuidV4()
    }
  }
}

export { User }