export interface IUser {
  username: string
  token: string
  account: {
    id: string
    balance: number
  }
}
