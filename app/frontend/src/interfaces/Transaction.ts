export interface ITransaction {
  id: string
  debitedAccountId: string
  createdAt: string
  description: string
  creditedAccountId: string
  value: number
}
