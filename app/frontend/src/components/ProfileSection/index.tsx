import { CiUser } from 'react-icons/ci'
import { Link, useLocation } from 'react-router-dom'
import styles from './styles.module.css'

export function ProfileSection() {
  const location = useLocation()

  return (
    <div className={styles.profileContainer}>
      <div className={styles.headerContainer}>
        <CiUser size={64} />
        <h1>Olá, User!</h1>
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
          <div className={styles.indicator}></div>
        </ul>
      </div>
    </div>
  )
}
