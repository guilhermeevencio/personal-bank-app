import styles from './styles.module.css'
import { FiAlertCircle } from 'react-icons/fi'
import { FormEvent, SyntheticEvent, useState } from 'react'
import { loginRequest } from '../../services/requests'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    const { id, value } = e.currentTarget
    id === 'username' ? setUsername(value) : setPassword(value)
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const userInfo = await loginRequest({ username, password })
    console.log(userInfo)
  }

  return (
    <div className={styles.loginContainer}>
      <form className={styles.formStyle} onSubmit={handleSubmit}>
        <h1>Personal Bank</h1>
        <div>
          <input
            id="username"
            type="text"
            placeholder="Seu nome..."
            onChange={handleChange}
            value={username}
          />
        </div>
        <div>
          <input
            id="password"
            type="password"
            placeholder="Sua senha..."
            onChange={handleChange}
            value={password}
          />
        </div>
        <button type="submit" disabled={username.length < 3}>
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
