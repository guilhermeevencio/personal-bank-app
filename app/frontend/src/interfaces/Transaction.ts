export interface ITransaction {
  id: string
  createdAt: string
  description: string
  debitedAccountId: {
    id: string
    balance: number
  }
  creditedAccountId: {
    id: string
    balance: number
  }
}
