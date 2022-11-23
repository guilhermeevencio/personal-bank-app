import { Link } from 'react-router-dom'
import { transactions } from '../../mocks'
import { TransactionCard } from '../TransactionCard'
import styles from './styles.module.css'

export function History() {
  return (
    <div className={styles.historyContainer}>
      <h2>Últimas Transações</h2>
      <Link to="/transactions-history" className={styles.linksContainer}>
        {transactions &&
          transactions.map(
            (
              {
                createdAt,
                creditedAccountId,
                debitedAccountId,
                description,
                id,
                value,
              },
              index,
            ) => {
              if (index < 2) {
                return (
                  <TransactionCard
                    key={id}
                    createdAt={createdAt}
                    debitedAccountId={debitedAccountId}
                    description={description}
                    creditedAccountId={creditedAccountId}
                    transactionId={id}
                    value={value / 100}
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
