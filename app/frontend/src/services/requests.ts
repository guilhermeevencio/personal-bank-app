import axios, { AxiosError } from 'axios'
import { IUser } from '../interfaces/User'

const baseURL = 'http://localhost:3001'

interface LoginRequestDTO {
  username: string
  password: string
}

interface IErrorResponse {
  error: string
}

const loginRequest = async ({ username, password }: LoginRequestDTO) => {
  try {
    const instance = axios.create({
      baseURL,
    })
    const response = await instance.post('/sessions', { username, password })
    return response.data as IUser
  } catch (e) {
    const error = e as AxiosError
    const message = error.response?.data

    return { error: message } as IErrorResponse
  }
}

export { loginRequest }
