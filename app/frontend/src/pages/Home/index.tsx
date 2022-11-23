import { AccountHeader } from '../../components/AccountHeader'
import { History } from '../../components/History'
import styles from './styles.module.css'

export function Home() {
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
