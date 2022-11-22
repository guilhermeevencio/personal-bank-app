import React, { useContext } from 'react'
import styles from './styles.module.css'
import { useLocation, Link } from 'react-router-dom'
import { BiHomeAlt, BiUserCircle } from 'react-icons/bi'
import { HiOutlineCreditCard } from 'react-icons/hi'
import { RiBillLine } from 'react-icons/ri'
import { AiOutlineRocket } from 'react-icons/ai'
import { AppContext, IAppContext } from '../../context/AppContext'

const TabBar = () => {
  const location = useLocation()
  const { userInfo } = useContext(AppContext) as IAppContext

  return (
    <div className={styles.navigation}>
      <h3>{`Olá, ${userInfo?.username}!` || 'Olá, Usuário!'}</h3>
      <ul>
        <li
          className={`${styles.list} ${
            location.pathname === '/cards' ? styles.active : null
          }`}
        >
          <Link to="cards" className={styles.buttonStyle}>
            <HiOutlineCreditCard className={styles.icon} />
            <span className={styles.text}>Cartões</span>
          </Link>
        </li>
        <li
          className={`${styles.list} ${
            location.pathname === '/transactions' ? styles.active : null
          }`}
        >
          <Link to="/transactions" className={styles.buttonStyle}>
            <AiOutlineRocket className={styles.icon} />
            <span className={styles.text}>Transferir</span>
          </Link>
        </li>
        <li
          className={`${styles.list} ${
            location.pathname === '/home' ? styles.active : null
          }`}
        >
          <Link to="home" className={styles.buttonStyle}>
            <BiHomeAlt className={styles.icon} />
            <span className={styles.text}>Início</span>
          </Link>
        </li>
        <li
          className={`${styles.list} ${
            location.pathname === '/transactions-history' ? styles.active : null
          }`}
        >
          <Link className={styles.buttonStyle} to="/transactions-history">
            <RiBillLine className={styles.icon} />
            <span className={styles.text}>Tansações</span>
          </Link>
        </li>
        <li
          className={`${styles.list} ${
            location.pathname === '/profile' ? styles.active : null
          }`}
        >
          <Link to="/profile" className={styles.buttonStyle}>
            <BiUserCircle className={styles.icon} />
            <span className={styles.text}>Perfil</span>
          </Link>
        </li>
        <div className={styles.indicator}></div>
      </ul>
    </div>
  )
}

export default TabBar
