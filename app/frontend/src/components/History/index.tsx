import { Link } from 'react-router-dom'
import { transactions } from '../../mocks'
import { TransactionCard } from '../TransactionCard'
import styles from './styles.module.css'

export function History() {
  return (
    <div className={styles.historyContainer}>
      <h2>Últimas Transações</h2>
      <Link to="/transactions-history">
        {transactions &&
          transactions.map(
            (
              {
                createdAt,
                creditedAccountId,
                debitedAccountId,
                description,
                id,
              },
              index,
            ) => {
              if (index < 2) {
                return (
                  <TransactionCard
                    key={id}
                    createdAt={createdAt}
                    debitedAccountId={debitedAccountId.id}
                    description={description}
                    creditedAccountId={creditedAccountId.id}
                    transactionId={id}
                  />
                )
              }
              return null
            },
          )}
      </Link>
    </div>
  )
}
