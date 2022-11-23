import styles from './styles.module.css'
import { FiAlertCircle } from 'react-icons/fi'
import { FormEvent, SyntheticEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerRequest } from '../../services/requests'
import { AxiosError } from 'axios'
import { AppContext, IAppContext } from '../../context/AppContext'
import { IUser } from '../../interfaces/User'

export function Register() {
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

    const registerResponse: IUser = await registerRequest({
      username,
      password,
    })

    if (registerResponse instanceof AxiosError) {
      setErrorMessage(registerResponse.response?.data.message)
    } else {
      setErrorMessage(null)
      setUserInfo(registerResponse)
      localStorage.setItem('userInfo', JSON.stringify(registerResponse))
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
        <p className={styles.observation}>
          * Seu nome deve ter pelo menos 3 caracteres.
        </p>
        <div>
          <input
            id="password"
            type="password"
            placeholder="Sua senha..."
            onChange={handleChange}
            value={password}
          />
        </div>
        <p className={styles.observation}>
          * Password deve conter número, uma letra maiúscula e um símbolo.
        </p>
        <button type="submit" disabled={username.length < 3}>
          Registrar
        </button>
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
