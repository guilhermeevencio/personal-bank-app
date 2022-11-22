import React, { useState } from 'react'
import { ITransaction } from '../interfaces/Transaction'
import { IUser } from '../interfaces/User'
import { AppContext } from './AppContext'

type Props = {
  children: React.ReactNode
}

function Provider({ children }: Props) {
  const [userInfo, setUserInfo] = useState<IUser | null>(null)
  const [transactions, setTransactions] = useState<ITransaction[] | null>(null)

  const contextValue = {
    userInfo,
    setUserInfo,
    transactions,
    setTransactions,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export { Provider }
