import axios from 'axios'

const baseURL = 'http://localhost:3001'

interface LoginRequestDTO {
  username: string
  password: string
}

interface ITransactionsHistory {
  accountId: string
  operation: string
  minDate?: string
  maxDate?: string
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

const transactionsHistoryRequest = async ({
  minDate,
  maxDate,
  accountId,
  operation,
  token,
}: ITransactionsHistory) => {
  try {
    const instance = axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${token}` },
    })

    if (minDate && maxDate) {
      const response = await instance.post(
        '/transactions/find-transactions-by-date',
        {
          minDate,
          maxDate,
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

export { loginRequest, transactionsHistoryRequest }
