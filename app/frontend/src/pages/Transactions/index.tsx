import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountHeader } from '../../components/AccountHeader'
import { CreateTransactionForm } from '../../components/CreateTransactionForm'
import { AppContext, IAppContext } from '../../context/AppContext'
import styles from './styles.module.css'

export function Transactions() {
  const { userInfo } = useContext(AppContext) as IAppContext

  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
  }, [])
  return (
    <div className={styles.transactionsContainer}>
      <AccountHeader />
      <CreateTransactionForm />
    </div>
  )
}
