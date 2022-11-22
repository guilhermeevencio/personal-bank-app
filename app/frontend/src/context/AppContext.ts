import React, { createContext } from 'react'
import { IUser } from '../interfaces/User'

export interface IAppContext {
  userInfo: IUser | null
  setUserInfo: React.Dispatch<React.SetStateAction<IUser | null>>
}

const AppContext = createContext<IAppContext | null>(null)

export { AppContext }
