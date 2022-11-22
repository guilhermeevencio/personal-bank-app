import { TransactionsHistoryForm } from '../../components/TransactionsHistoryForm'
import styles from './styles.module.css'

export function TransactionsHistory() {
  return (
    <div className={styles.transactionsHistoryContainer}>
      <h1>Histórico de transações</h1>
      <TransactionsHistoryForm />
    </div>
  )
}
