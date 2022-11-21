import axios from 'axios'
import { IUser } from '../interfaces/User'

const baseURL = 'http://localhost:3001'

interface LoginRequestDTO {
  username: string
  password: string
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
    return response.data as IUser
  } catch (e) {
    return e
  }
}

export { loginRequest }
