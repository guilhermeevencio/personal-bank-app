import PropTypes, { InferProps } from 'prop-types'
import styles from './styles.module.css'

export function TransactionCard({
  createdAt,
  description,
  debitedAccountId,
  creditedAccountId,
  transactionId,
  value,
}: InferProps<typeof TransactionCard.propTypes>) {
  return (
    <div key={transactionId} className={styles.historyCard}>
      <div className={styles.cardItem}>
        <h3>Descrição</h3>
        <p>{description}</p>
      </div>
      <div className={styles.cardItem}>
        <h3>Conta Destino</h3>
        <p>{creditedAccountId}</p>
      </div>

      <div className={styles.cardItem}>
        <h3>Conta de Origem</h3>
        <p>{debitedAccountId}</p>
      </div>
      <div className={styles.cardItem}>
        <h3>Data da Transferência</h3>
        <p>{createdAt}</p>
      </div>
      <div className={styles.cardItem}>
        <h3>Valor</h3>
        <p>{value}</p>
      </div>
    </div>
  )
}

TransactionCard.propTypes = {
  createdAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  debitedAccountId: PropTypes.string.isRequired,
  creditedAccountId: PropTypes.string.isRequired,
  transactionId: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}
