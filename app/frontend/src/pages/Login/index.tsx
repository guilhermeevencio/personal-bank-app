import styles from './styles.module.css'
import { FiAlertCircle } from 'react-icons/fi'

export function Login() {
  return (
    <div className={styles.loginContainer}>
      <form className={styles.formStyle}>
        <h1>Personal Bank</h1>
        <div>
          <input id="username" type="text" placeholder="Seu nome..." />
        </div>
        <div>
          <input id="username" type="password" placeholder="Sua senha..." />
        </div>
        <button type="submit" disabled>
          Entrar
        </button>
        <div className={styles.resgiterContainer}>
          <p>Não tem conta?</p>
          <button type="button">Registre-se</button>
        </div>
      </form>
      <p className={styles.displayError}>
        <FiAlertCircle />
        Errors section!
      </p>
    </div>
  )
}
