import React, { createContext } from 'react'
import { ITransaction } from '../interfaces/Transaction'
import { IUser } from '../interfaces/User'

export interface IAppContext {
  userInfo: IUser | null
  setUserInfo: React.Dispatch<React.SetStateAction<IUser | null>>
  transactions: ITransaction[] | null
  setTransactions: React.Dispatch<React.SetStateAction<ITransaction[] | null>>
}

const AppContext = createContext<IAppContext | null>(null)

export { AppContext }
