import React, { useEffect, useState } from 'react'
import { CiUser } from 'react-icons/ci'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IUser } from '../../interfaces/User'
import styles from './styles.module.css'

export function ProfileSection() {
  const location = useLocation()
  const [user, setUser] = useState<IUser | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const userFromLS = localStorage.getItem('userInfo')
    if (userFromLS) {
      const parsed: IUser = JSON.parse(userFromLS)
      setUser(parsed)
    }
  }, [])

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('transactions')
    navigate('/')
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.headerContainer}>
        <CiUser size={64} />
        <h2>{`Olá, ${user?.username!}`}</h2>
      </div>
      <div className={styles.navigation}>
        <ul>
          <li
            className={`${styles.list} ${
              location.pathname === '/cards' ? styles.active : null
            }`}
          >
            <Link to="cards" className={styles.buttonStyle}>
              <span className={styles.text}>Cartões</span>
            </Link>
          </li>
          <li
            className={`${styles.list} ${
              location.pathname === '/transactions' ? styles.active : null
            }`}
          >
            <Link to="/transactions" className={styles.buttonStyle}>
              <span className={styles.text}>Transferir</span>
            </Link>
          </li>
          <li
            className={`${styles.list} ${
              location.pathname === '/home' ? styles.active : null
            }`}
          >
            <Link to="home" className={styles.buttonStyle}>
              <span className={styles.text}>Início</span>
            </Link>
          </li>
          <li
            className={`${styles.list} ${
              location.pathname === '/transactions-history'
                ? styles.active
                : null
            }`}
          >
            <Link className={styles.buttonStyle} to="/transactions-history">
              <span className={styles.text}>Tansações</span>
            </Link>
          </li>
          <li
            className={`${styles.list} ${
              location.pathname === '/profile' ? styles.active : null
            }`}
          >
            <Link to="/profile" className={styles.buttonStyle}>
              <span className={styles.text}>Perfil</span>
            </Link>
          </li>
          <div className={styles.logoutContainer}>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </ul>
      </div>
    </div>
  )
}
