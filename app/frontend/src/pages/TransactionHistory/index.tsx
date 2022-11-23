import { useContext } from 'react'
import { TransactionCard } from '../../components/TransactionCard'
import { TransactionsHistoryForm } from '../../components/TransactionsHistoryForm'
import { AppContext, IAppContext } from '../../context/AppContext'
import styles from './styles.module.css'

export function TransactionsHistory() {
  const { transactions } = useContext(AppContext) as IAppContext
  console.log(transactions)

  return (
    <div className={styles.transactionsHistoryContainer}>
      <h1>Histórico de transações</h1>
      <TransactionsHistoryForm />
      <div className={styles.cardsContainer}>
        {transactions &&
          transactions.map(
            ({
              createdAt,
              creditedAccountId,
              debitedAccountId,
              description,
              id,
              value,
            }) => (
              <TransactionCard
                key={id}
                createdAt={createdAt}
                debitedAccountId={debitedAccountId}
                description={description}
                creditedAccountId={creditedAccountId}
                transactionId={id}
                value={value / 100}
              />
            ),
          )}
      </div>
    </div>
  )
}
