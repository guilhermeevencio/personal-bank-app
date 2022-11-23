import axios from 'axios'

const baseURL = 'http://localhost:3001'

interface LoginRequestDTO {
  username: string
  password: string
}

interface ITransactionsHistory {
  accountId: string
  operation: string
  minDateStr?: string
  maxDateStr?: string
  token: string
}

interface ICreateTransaction {
  debitedAccountId: string
  creditedAccount: string
  description: string
  value: number
  token: string
}

export interface IErrorResponse {
  error: { message: string }
}

const loginRequest = async ({ username, password }: LoginRequestDTO) => {
  try {
    const instance = axios.create({
      baseURL,
    })
    const response = await instance.post('/sessions', { username, password })
    return response.data
  } catch (e) {
    return e
  }
}

const registerRequest = async ({ username, password }: LoginRequestDTO) => {
  try {
    const instance = axios.create({
      baseURL,
    })
    const response = await instance.post('/users', { username, password })
    console.log(response)

    const authResponse = await instance.post('/sessions', {
      username,
      password,
    })
    return authResponse.data
  } catch (e) {
    return e
  }
}

const transactionsHistoryRequest = async ({
  minDateStr,
  maxDateStr,
  accountId,
  operation,
  token,
}: ITransactionsHistory) => {
  try {
    const instance = axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!!minDateStr && !!maxDateStr) {
      const response = await instance.post(
        '/transactions/find-transactions-by-date',
        {
          minDateStr,
          maxDateStr,
          accountId,
          operation,
        },
      )
      return response.data
    } else {
      const response = await instance.post('/transactions/find-transactions', {
        accountId,
        operation,
      })
      return response.data
    }
  } catch (e) {
    return e
  }
}

const createTransactionRequest = async ({
  debitedAccountId,
  creditedAccount,
  description,
  value,
  token,
}: ICreateTransaction) => {
  try {
    const instance = axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${token}` },
    })

    const response = await instance.post('/transactions/create', {
      debitedAccountId,
      creditedAccount,
      description,
      value,
    })
    return response.data
  } catch (error) {
    return error
  }
}

export {
  loginRequest,
  transactionsHistoryRequest,
  createTransactionRequest,
  registerRequest,
}
