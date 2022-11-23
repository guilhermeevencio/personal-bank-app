interface ITransactionDTO {
  creditedAccount: string
  debitedAccountId: string
  description: string
  value: number
}

export { ITransactionDTO }