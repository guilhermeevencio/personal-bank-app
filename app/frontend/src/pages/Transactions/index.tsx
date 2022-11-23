import { AccountHeader } from '../../components/AccountHeader'
import { CreateTransactionForm } from '../../components/CreateTransactionForm'
import styles from './styles.module.css'

export function Transactions() {
  return (
    <div className={styles.transactionsContainer}>
      <AccountHeader />
      <CreateTransactionForm />
    </div>
  )
}
