import { AxiosError } from 'axios'
import React, {
  FormEvent,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react'
import { AppContext, IAppContext } from '../../context/AppContext'
import { IUser } from '../../interfaces/User'
import { transactionsHistoryRequest } from '../../services/requests'
import styles from './styles.module.css'

export function TransactionsHistoryForm() {
  const [minDateStr, setMinDate] = useState<string>('')
  const [maxDateStr, setMaxDate] = useState<string>('')
  const [user, setUser] = useState<IUser | null>(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [operation, setOperation] = useState('all')

  const { setTransactions } = useContext(AppContext) as IAppContext

  useEffect(() => {
    const userInfoFromLS = localStorage.getItem('userInfo')
    if (userInfoFromLS) {
      const parsedUserInfo = JSON.parse(userInfoFromLS)
      setUser(parsedUserInfo)
    }
  }, [])

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    const id = e.currentTarget.id
    switch (id) {
      case 'minDate':
        setMinDate(e.currentTarget.value)
        break
      case 'maxDate':
        setMaxDate(e.currentTarget.value)
        break
      default:
        break
    }
  }

  const handleOperationChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setOperation(e.currentTarget.value)
  }

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault()
    if (user) {
      const transactions = await transactionsHistoryRequest({
        minDateStr,
        maxDateStr,
        accountId: user?.account.id,
        operation,
        token: user?.token,
      })
      if (transactions instanceof AxiosError) {
        setErrorMessage(transactions.response?.data.message)
      } else {
        setErrorMessage(null)
        setTransactions(transactions)
        localStorage.setItem('transactions', JSON.stringify(transactions))
      }
    }
  }

  return (
    <div className={styles.transactionsHistoryFormContainer}>
      <form onSubmit={handleSubmit} className={styles.formStyle}>
        <div className={styles.inputContainer}>
          <label htmlFor="minDate">De:</label>
          <input
            type="date"
            placeholder="menor data..."
            id="minDate"
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="maxDate">At??:</label>
          <input
            type="date"
            placeholder="maior data..."
            id="maxDate"
            onChange={handleChange}
          />
        </div>
        <div className={styles.selectContainer}>
          <label>Tipo de transa????o</label>
          <select
            id="operation"
            placeholder="tipo de transa????o..."
            onChange={handleOperationChange}
          >
            <option disabled>selecione um tipo</option>
            <option value="all" defaultChecked>
              Todas
            </option>
            <option value="cash-in">Transef??ncias Realizadas</option>
            <option value="cash-out">Transfer??ncias Recebidas</option>
          </select>
        </div>
        <button type="submit">Filtrar</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  )
}
