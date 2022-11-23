import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountHeader } from '../../components/AccountHeader'
import { History } from '../../components/History'
import styles from './styles.module.css'
import { transactionsHistoryRequest } from '../../services/requests'
import { AxiosError } from 'axios'
import { AppContext, IAppContext } from '../../context/AppContext'

export function Home() {
  const { userInfo, setTransactions } = useContext(AppContext) as IAppContext
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      async function getHistory() {
        const transactionsHistory = await transactionsHistoryRequest({
          accountId: userInfo?.account.id || '',
          operation: 'all',
          token: userInfo?.token || '',
        })
        if (transactionsHistory instanceof AxiosError) {
          console.log(transactionsHistory)

          localStorage.removeItem('userInfo')
          localStorage.removeItem('transactions')
          navigate('/')
        } else {
          setTransactions(transactionsHistory)
        }
      }
      getHistory()
    }
  }, [])

  return (
    <div className={styles.homeContainer}>
      <div>
        <AccountHeader />
        <div className={styles.historyContainer}>
          <History />
        </div>
      </div>
    </div>
  )
}
