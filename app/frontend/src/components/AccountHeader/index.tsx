import { useEffect, useState } from 'react'
import { IUser } from '../../interfaces/User'
import styles from './styles.module.css'

export function AccountHeader() {
  const [user, setUser] = useState<IUser | null>(null)
  useEffect(() => {
    const userFromLS = localStorage.getItem('userInfo')
    if (userFromLS) {
      const parsed: IUser = JSON.parse(userFromLS)
      setUser(parsed)
    }
  }, [])

  return (
    <div className={styles.accountHeaderContainer}>
      <div className={styles.accountSection}>
        <h3>Conta</h3>
        <p>{user ? user.account.id : '123456'}</p>
      </div>
      <div className={styles.balanceSection}>
        <h3>Saldo</h3>
        <p>{user?.account.balance || 'R$ 100,00'}</p>
      </div>
    </div>
  )
}
