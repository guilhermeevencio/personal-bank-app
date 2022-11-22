import styles from './styles.module.css'
import { FiAlertCircle } from 'react-icons/fi'
import { FormEvent, SyntheticEvent, useContext, useState } from 'react'
import { loginRequest } from '../../services/requests'
import { AxiosError } from 'axios'
import { AppContext, IAppContext } from '../../context/AppContext'
import { IUser } from '../../interfaces/User'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const { setUserInfo } = useContext(AppContext) as IAppContext
  const navigate = useNavigate()

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    const { id, value } = e.currentTarget
    id === 'username' ? setUsername(value) : setPassword(value)
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const loginResponse: IUser = await loginRequest({
      username,
      password,
    })

    if (loginResponse instanceof AxiosError) {
      setErrorMessage(loginResponse.response?.data.message)
    } else {
      setErrorMessage(null)
      setUserInfo(loginResponse)
      localStorage.setItem('userInfo', JSON.stringify(loginResponse))
      navigate('/home')
    }
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
      {errorMessage ? (
        <p className={styles.displayError}>
          <FiAlertCircle />
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
}
