interface ITransactionDTO {
  creditedAccountId: string
  debitedAccountId: string
  description: string
  value: number
}

export { ITransactionDTO }